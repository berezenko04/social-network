import crypto from 'crypto'
import dotenv from 'dotenv'
import sharp from 'sharp'
import fs from 'fs'

//schemas
import PostModel from '../schemas/post.js'
import UserModel from '../schemas/user.js'

dotenv.config();

export const createPost = async (req, res) => {
    try {
        const userId = req.userId;
        const attached = req.files;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const attachedUrls = [];

        for (const item of attached) {
            const tempFilePath = item.path;
            const originalName = item.originalname;

            const hash = crypto
                .createHash("md5")
                .update(originalName + Date.now())
                .digest("hex")
                .toString();

            const destinationPath = `uploads/${hash}.webp`;

            sharp(tempFilePath).toFile(destinationPath, () => {
                fs.unlink(tempFilePath, (error) => {
                    if (error) {
                        console.error(`Error while deleting temporary file: ${error}`);
                    }
                });
            });

            const imageUrl = `${process.env.SERVER_PATH}/${destinationPath}`;
            attachedUrls.push(imageUrl);
        }

        const postItem = new PostModel({
            content: req.body.content,
            attached: attachedUrls,
            user: userId
        });

        await postItem.save();

        res.status(200).json({
            message: 'Post created succesfully'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to post publication",
        });
    }
}

export const getPosts = async (_, res) => {
    try {
        const posts = await PostModel.find();
        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}
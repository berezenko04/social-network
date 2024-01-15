import crypto from 'crypto'
import dotenv from 'dotenv'
import sharp from 'sharp'
import fs from 'fs'

//schemas
import PostModel from '../schemas/post.js'
import UserModel from '../schemas/user.js'
import LikesModel from '../schemas/likes.js'

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

            const imageUrl = `http://${process.env.SERVER_PATH}/${destinationPath}`;
            attachedUrls.push(imageUrl);
        }

        const postItem = new PostModel({
            content: req.body.content,
            attached: attachedUrls,
            user: userId
        });

        const likesItem = new LikesModel({
            post: postItem.id
        })

        await postItem.save();
        await likesItem.save();

        res.status(200).json(postItem);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to post publication",
        });
    }
}

export const getPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = 10;

        const skip = (page - 1) * pageSize;
        const posts = await PostModel
            .find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(pageSize * page);

        const postsCount = await PostModel.countDocuments({});

        res.status(200).json({
            posts,
            count: postsCount
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

export const getPostLikes = async (req, res) => {
    try {
        const postId = req.body.postId;
        const likes = await LikesModel.find({ post: postId });
        const likesCount = await LikesModel.countDocuments({ post: postId });

        res.status(200).json({
            likes: likes,
            count: likesCount
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server error"
        })
    }
}
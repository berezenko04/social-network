import crypto from 'crypto'
import dotenv from 'dotenv'
import sharp from 'sharp'
import fs from 'fs'

//schemas
import PostModel from '../schemas/post.js'
import UserModel from '../schemas/user.js'
import LikesModel from '../schemas/likes.js'
import BookmarksModel from '../schemas/bookmarks.js'

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
            user: userId,
        });

        const likesItem = new LikesModel({ post: postItem.id, })

        const bookmarksItem = new BookmarksModel({ post: postItem.id })

        await postItem.save();
        await likesItem.save();
        await bookmarksItem.save();

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
        // const page = parseInt(req.query.page) || 1;
        // const pageSize = 10;

        // const skip = (page - 1) * pageSize;
        const posts = await PostModel
            .find()
            .sort({ createdAt: -1 })
        // .skip(skip)
        // .limit(pageSize * page);

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

export const getPost = async (req, res) => {
    try {
        const postId = req.query.postId;

        const post = await PostModel.findById(postId);

        if (!post) {
            res.status(404).json({
                message: "Post is not found",
            });
        }

        res.status(200).json({ post });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

export const deletePost = async (req, res) => {
    try {
        const userId = req.userId;
        const postId = req.query.postId;

        const user = await UserModel.findById(userId);
        const post = await PostModel.findById(postId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.user.toString() !== user._id.toString()) {
            return res.status(404).json({ message: "Access denied" })
        }

        await PostModel.deleteOne({ _id: postId });
        await LikesModel.deleteOne({ post: postId });
        await BookmarksModel.deleteOne({ post: postId });

        res.status(200).json({
            message: 'Success',
            postId: postId
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error'
        })
    }
}
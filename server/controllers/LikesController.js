import mongoose from 'mongoose';

//models
import LikesModel from '../schemas/likes.js'
import UserModel from '../schemas/user.js'
import PostModel from '../schemas/post.js'

export const likePost = async (req, res) => {
    try {
        const { postId } = req.query;
        const userId = req.userId;

        const user = await UserModel.findById(userId);
        const post = await PostModel.findById(postId);

        if (!user) {
            res.status(400).json({
                message: "User is not found",
            });
        }

        if (!post) {
            res.status(400).json({
                message: "Post is not found",
            });
        }

        const likeItem = await LikesModel.findOne({ post: postId });

        if (likeItem.users.includes(userId)) {
            await LikesModel.findOneAndUpdate(
                { post: postId },
                { $pull: { users: userId }, $inc: { count: -1 } },
            );
        } else {
            await LikesModel.findOneAndUpdate(
                { post: postId },
                { $push: { users: userId }, $inc: { count: 1 } },
            );
        }

        res.status(200).json({
            message: "Success"
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const isLiked = async (req, res) => {
    try {
        const userId = req.userId;
        const { postId } = req.query;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const likeItem = await LikesModel.findOne({ post: postId });

        if (likeItem.users.includes(userId)) {
            res.status(200).json({ isLiked: true });
        } else {
            res.status(200).json({ isLiked: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server error"
        })
    }
}

export const getLikesCount = async (req, res) => {
    try {
        const { postId } = req.query;

        const likesItem = await LikesModel.findOne({ post: new mongoose.Types.ObjectId(postId) });

        if (!likesItem) {
            res.status(400).json({
                message: "Likes is unavailable for this post"
            })
        }

        res.status(200).json({
            count: likesItem.count
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server error"
        })
    }
}
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

        const likeItem = await LikesModel.findOneAndUpdate(
            { post: postId },
            { $push: { users: userId } },
            { new: true }
        );

        await likeItem.save();

        res.status(200).json(likeItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const dislikePost = async (req, res) => {
    try {
        const { postId } = req.query;
        const userId = req.userId;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await LikesModel.findOneAndUpdate(
            { post: postId },
            { $pull: { users: userId } },
        );

        res.status(200);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}
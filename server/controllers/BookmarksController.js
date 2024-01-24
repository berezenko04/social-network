//models
import BookmarksModel from '../schemas/bookmarks.js'
import UserModel from '../schemas/user.js'
import PostModel from '../schemas/post.js'

export const bookmarkPost = async (req, res) => {
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

        const bookmarkItem = await BookmarksModel.findOne({ post: postId });

        if (bookmarkItem.users.includes(userId)) {
            await BookmarksModel.findOneAndUpdate(
                { post: postId },
                { $pull: { users: userId } },
            );
        } else {
            await BookmarksModel.findOneAndUpdate(
                { post: postId },
                { $push: { users: userId } },
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

export const isBookmarked = async (req, res) => {
    try {
        const userId = req.userId;
        const { postId } = req.query;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const bookmarkItem = await BookmarksModel.findOne({ post: postId });

        if (bookmarkItem.users.includes(userId)) {
            res.status(200).json({ isBookmark: true });
        } else {
            res.status(200).json({ isBookmark: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server error"
        })
    }
}

export const getBookmarksByUser = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const bookmarks = await BookmarksModel.find({ users: userId });
        const postIds = bookmarks.map(bookmark => bookmark.post);
        const posts = await PostModel.find({ _id: { $in: postIds } });

        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server error"
        })
    }
}
import mongoose from "mongoose";

const BookmarksSchema = new mongoose.Schema(
    {
        users: {
            type: Array,
            items: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: []
            }
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Bookmarks", BookmarksSchema);
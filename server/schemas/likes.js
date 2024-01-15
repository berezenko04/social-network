import mongoose from "mongoose";

const LikesSchema = new mongoose.Schema(
    {
        likes: {
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

export default mongoose.model("Likes", LikesSchema);
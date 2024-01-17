import mongoose from "mongoose";

const LikesSchema = new mongoose.Schema(
    {
        users: {
            type: Array,
            items: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: []
            }
        },
        count: {
            type: Number,
            default: 0
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
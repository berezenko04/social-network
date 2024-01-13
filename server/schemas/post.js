import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        attached: {
            type: Array,
            items: {
                image: String
            }
        },
        likes: {
            type: Number,
            default: 0
        },
        views: {
            type: Number,
            default: 0
        },
        date: {
            type: Date,
            default: Date.now()
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Post", PostSchema);
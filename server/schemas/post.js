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
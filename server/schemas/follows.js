import mongoose from "mongoose";

const FollowSchema = new mongoose.Schema(
    {
        followers: {
            type: Array,
            items: {
                type: String,
                default: []
            }
        },
        following: {
            type: Array,
            items: {
                type: String,
                default: []
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

export default mongoose.model("Follows", FollowSchema);
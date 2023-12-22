import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        avatarUrl: {
            type: String,
            default: "http://localhost:3001/uploads/default-avatar.jpg",
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        birthDate: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", UserSchema);
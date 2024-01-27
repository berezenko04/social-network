import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        avatarUrl: {
            type: String,
            default: "http://localhost:3001/uploads/default-avatar.jpg",
        },
        posterUrl: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            default: '',
            unique: true
        },
        siteUrl: {
            type: String,
            default: ''
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
        },
        description: {
            type: String,
            default: ''
        },
        followers: {
            type: Number,
            default: 0
        },
        following: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", UserSchema);
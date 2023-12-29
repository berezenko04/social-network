import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import fs from 'fs'
import sharp from 'sharp'

//models
import UserModel from '../schemas/user.js'

export const register = async (req, res) => {
    try {
        const existingUser = await UserModel.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            name: req.body.name,
            birthDate: req.body.birthDate,
            email: req.body.email,
            passwordHash: hash,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            process.env.TOKEN_PASS,
            {
                expiresIn: "3d",
            }
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to register",
        });
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                message: "User is not found",
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPass) {
            return res.status(401).json({
                message: "Password is incorrect",
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            process.env.TOKEN_PASS,
            {
                expiresIn: "30d",
            }
        );

        const { passwordHash, ...userData } = user._doc;
        await user.save();

        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to auth",
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: "User is not found",
            });
        }

        const { passwordHash, ...userData } = user._doc;
        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Access denied",
        });
    }
};

export const updateInfo = async (req, res) => {
    try {
        const updatedData = req.body;
        const avatar = req.body.avatar;

        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (avatar.path) {
            try {
                const tempFilePath = avatar.path;
                const originalName = avatar.originalname;

                const hash = crypto
                    .createHash("md5")
                    .update(originalName + Date.now())
                    .digest("hex");
                const destinationPath = `uploads/${hash}.webp`;

                await sharp(tempFilePath)
                    .resize(200, 200, { fit: "inside", })
                    .toFile(destinationPath, (err, info) => {
                        if (err) {
                            console.error(`Error while resizing image: ${err}`);
                        } else {
                            fs.unlink(tempFilePath, (error) => {
                                if (error) {
                                    console.error(`Error while deleting temporary file: ${error}`);
                                }
                            });
                        }
                    });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error while uploading image" });
            }
        }

        Object.keys(updatedData).forEach((key) => {
            if (user[key] !== updatedData[key]) {
                user[key] = updatedData[key];
            }
        });

        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}
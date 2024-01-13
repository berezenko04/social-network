import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

//models
import UserModel from '../schemas/user.js'

//utils
import { generateUniqueUsername } from '../utils/generateUniqueUsername.js'

export const register = async (req, res) => {
    try {
        const existingUser = await UserModel.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const username = await generateUniqueUsername(req.body.name);

        const doc = new UserModel({
            name: req.body.name,
            birthDate: req.body.birthDate,
            email: req.body.email,
            passwordHash: hash,
            username
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

export const getUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.query.userId);
        if (!user) {
            return res.status(404).json({ 
                message: "User is not found",
            });
        }
        const { ...userData } = user._doc;
        res.status(200).json({
            ...userData,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to receive user",
        });
    }
}

import express from "express";
import multer from 'multer'

import checkAuth from '../utils/checkAuth.js'

//controllers
import * as PostController from "../controllers/PostController.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, "uploads");
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

router.post("/create", upload.array('images[]'), checkAuth, PostController.createPost);
router.post("/all", PostController.getPosts);

export default router;
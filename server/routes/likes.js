import express from "express";

//utils
import checkAuth from '../utils/checkAuth.js'

//controllers
import * as LikesController from "../controllers/LikesController.js";

const router = express.Router();

router.post("/add", checkAuth, LikesController.likePost);
router.get("/isLiked", checkAuth, LikesController.isLiked);
router.get("/get", LikesController.getLikesCount);

export default router;
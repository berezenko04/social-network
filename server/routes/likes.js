import express from "express";

//utils
import checkAuth from '../utils/checkAuth.js'

//controllers
import * as LikesController from "../controllers/LikesController.js";

const router = express.Router();

router.post("/add", checkAuth, LikesController.likePost);
router.post("/remove", checkAuth, LikesController.dislikePost);

export default router;
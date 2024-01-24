import express from "express";

//utils
import checkAuth from '../utils/checkAuth.js'

//controllers
import * as FollowController from "../controllers/FollowController.js";

const router = express.Router();

router.post("/follow", checkAuth, FollowController.follow);
router.get("/isFollowed", checkAuth, FollowController.isFollowed);

export default router;
import express from "express";

//controllers
import * as UserController from "../controllers/UserController.js";

//utils
import checkAuth from '../utils/checkAuth.js'

const router = express.Router();

router.get("/get", UserController.getUser);
router.get("/getByUsername", UserController.getUserByUsername);
router.get("/getPostsCount", UserController.getUserPostsCountByUsername);
router.get("/all", checkAuth, UserController.getUsers);


export default router;
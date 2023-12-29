import express from "express";

//utils
import checkAuth from '../utils/checkAuth.js'

//controllers
import * as UserController from "../controllers/UserController.js";

const router = express.Router();

router.post("/update-info", checkAuth, UserController.updateInfo);


export default router;
import express from "express";

//controllers
import * as UserController from "../controllers/UserController.js";

const router = express.Router();

router.get("/get", UserController.getUser);


export default router;
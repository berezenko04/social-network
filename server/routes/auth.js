import express from "express";

//validation
import { loginValidation, registerValidation } from "../validations/authValidation.js";

//utils
import validationErrors from '../utils/validationErrors.js'
import checkAuth from '../utils/checkAuth.js'

//controllers
import * as UserController from "../controllers/UserController.js";

const router = express.Router();

router.post("/login", loginValidation, validationErrors, UserController.login);
router.post("/register", registerValidation, validationErrors, UserController.register);
router.get("/me", checkAuth, UserController.getMe);


export default router;
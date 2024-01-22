import express from "express";

//controllers
import * as SearchContoller from "../controllers/SearchController.js";

//utils
import checkAuth from '../utils/checkAuth.js'

const router = express.Router();

router.get("/byUsername", checkAuth, SearchContoller.searchByUser);


export default router;
import express from "express";

//utils
import checkAuth from '../utils/checkAuth.js'

//controllers
import * as BookmarksController from "../controllers/BookmarksController.js";

const router = express.Router();

router.post("/add", checkAuth, BookmarksController.bookmarkPost);
router.get("/isBookmarked", checkAuth, BookmarksController.isBookmarked);
router.get("/get", checkAuth, BookmarksController.getBookmarksByUser);

export default router;
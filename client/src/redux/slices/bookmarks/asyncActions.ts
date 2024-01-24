import { getBookmarks } from "@/API/bookmarksService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBookmarks = createAsyncThunk(
    '/posts/fetchBookmarks',
    async () => {
        const data = await getBookmarks();
        return data;
    }
)
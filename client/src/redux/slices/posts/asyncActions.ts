import { getPosts } from "@/API/postsService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
    '/posts/fetchPosts',
    async (page: number) => {
        const data = await getPosts(page);
        return data;
    }
)
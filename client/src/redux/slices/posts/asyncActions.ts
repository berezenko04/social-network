import { getPosts } from "@/API/postsService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
    '/posts/fetchPosts',
    async () => {
        const data = await getPosts();
        return data;
    }
)
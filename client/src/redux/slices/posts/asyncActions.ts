import { createPost as makePost, getPosts } from "@/API/postsService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
    '/posts/fetchPosts',
    async (page: number) => {
        const data = await getPosts(page);
        return data;
    }
)

export const createPost = createAsyncThunk(
    'posts/create',
    async (postData: FormData) => {
        const data = await makePost(postData);
        return data;
    }
)
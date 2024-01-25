import { createPost as makePost, getPosts, removePost } from "@/API/postsService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
    '/posts/fetchPosts',
    async () => {
        const data = await getPosts();
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

export const deletePost = createAsyncThunk(
    'posts/delete',
    async (postId: string) => {
        const data = await removePost(postId);
        return data;
    }
)
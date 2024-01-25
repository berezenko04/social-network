import { Status } from "@/@types/type";
import { IFetchPosts, IPostState, TDeletePost, TPost } from "./types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createPost, deletePost, fetchPosts } from "./asyncActions";


const initialState: IPostState = {
    data: [],
    count: 0,
    status: Status.LOADING
}

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.data = [];
            state.count = 0;
            state.status = Status.LOADING
        })

        builder.addCase(fetchPosts.fulfilled, (state, action: PayloadAction<IFetchPosts>) => {
            state.data = action.payload.posts;
            state.count = action.payload.count;
            state.status = Status.SUCCESS;
        })

        builder.addCase(fetchPosts.rejected, (state) => {
            state.data = [];
            state.count = 0;
            state.status = Status.ERROR;
        })

        builder.addCase(createPost.fulfilled, (state, action: PayloadAction<TPost>) => {
            state.data?.unshift(action.payload);
        })

        builder.addCase(deletePost.fulfilled, (state, action: PayloadAction<TDeletePost>) => {
            state.data = state.data?.filter((i) => i._id !== action.payload.postId);
        })
    }
})

export default postSlice.reducer
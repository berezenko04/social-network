import { Status } from "@/@types/type";
import { IPostState, TPost } from "./types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "./asyncActions";


const initialState: IPostState = {
    data: null,
    status: Status.LOADING
}

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.data = null;
            state.status = Status.LOADING
        })

        builder.addCase(fetchPosts.fulfilled, (state, action: PayloadAction<TPost[]>) => {
            state.data = action.payload;
            state.status = Status.SUCCESS;
        })

        builder.addCase(fetchPosts.rejected, (state) => {
            state.data = null;
            state.status = Status.ERROR;
        })
    }
})

export default postSlice.reducer
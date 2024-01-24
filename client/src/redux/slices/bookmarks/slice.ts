import { Status } from "@/@types/type";
import { fetchBookmarks } from "./asyncActions";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBookmarksState } from "./types";
import { TPost } from "../posts/types";


const initialState: IBookmarksState = {
    data: [],
    status: Status.LOADING
}

export const bookmarksSlice = createSlice({
    name: 'bookmarks',
    initialState,
    reducers: {
        clearBookmarksData(state) {
            state.data = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBookmarks.pending, (state) => {
            state.data = [];
            state.status = Status.LOADING
        })

        builder.addCase(fetchBookmarks.fulfilled, (state, action: PayloadAction<TPost[]>) => {
            state.data = action.payload;
            state.status = Status.SUCCESS;
        })

        builder.addCase(fetchBookmarks.rejected, (state) => {
            state.data = [];
            state.status = Status.ERROR;
        })
    }
})

export const { clearBookmarksData } = bookmarksSlice.actions;

export default bookmarksSlice.reducer
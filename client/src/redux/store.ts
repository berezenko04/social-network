import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

//slices
import user from './slices/user/slice'
import posts from './slices/posts/slice'
import bookmarks from './slices/bookmarks/slice'

export const store = configureStore({
    reducer: {
        user,
        posts,
        bookmarks
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
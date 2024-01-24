import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthMe } from "@/API/authService";
import { updateInfo } from "@/API/userService";
import { IUpdateInfo } from "./types";


export const fetchAuthMe = createAsyncThunk(
    '/auth/fetchAuthMe',
    async () => {
        const data = await getAuthMe();
        return data;
    }
)

export const updateUser = createAsyncThunk(
    '/user/updateUser',
    async (data: Partial<IUpdateInfo>) => {
        await updateInfo(data);
    }
)
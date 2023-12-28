import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthMe } from "@/API/authService";


export const fetchAuthMe = createAsyncThunk(
    '/auth/fetchAuthMe',
    async () => {
        const data = await getAuthMe();
        return data;
    }
)
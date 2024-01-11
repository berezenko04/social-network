import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

//asyncActions
import { fetchAuthMe } from './asyncActions';

//types
import { Status } from '@/@types/type';
import { IUserData, IUserSliceState } from './types';


const initialState: IUserSliceState = {
    data: null,
    status: Status.LOADING,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            Cookies.remove('token');
            state.data = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuthMe.pending, (state) => {
            state.data = null;
            state.status = Status.LOADING
        })

        builder.addCase(fetchAuthMe.fulfilled, (state, action: PayloadAction<IUserData>) => {
            state.data = action.payload;
            state.status = Status.SUCCESS;
        })

        builder.addCase(fetchAuthMe.rejected, (state) => {
            state.data = null;
            state.status = Status.ERROR;
        })
    }
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
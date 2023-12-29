import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
    reducers: {},
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

export default userSlice.reducer;
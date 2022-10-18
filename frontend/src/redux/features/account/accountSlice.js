// @ts-nocheck
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import accountService from './accountService';

const initialState = {
    isLoading: false,
    user: null,
    isSuccess: false,
    isError: false,
    message : ''
};

// Register user
export const getUser = createAsyncThunk(
    'ACCOUNT/GET_USER',
    async (userId, thunkAPI) => {
        try {
            const response = await accountService.getUser(userId);
            const { success, message } = response;
            if (!success) return thunkAPI.rejectWithValue(message);
            return response.user;
        } catch (err) {
            const message = err.response.data.message || 'Something went wrong';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const resetPassword = createAsyncThunk(
    'ACCOUNT/RESET_PASSWORD',
    async (email, thunkAPI) => {
        try {
            const response = await accountService.resetPassword(email);
            const { success, message } = response;
            if (!success) return thunkAPI.rejectWithValue(message);
            return message;
        } catch (err) {
            const message = err.response.data.message || 'Something went wrong';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const resetPasswordCallback = createAsyncThunk(
    'ACCOUNT/RESET_PASSWORD_CALLBACK',
    async (resetPasswordData, thunkAPI) => {
        try {
            const response = await accountService.resetPasswordCallback(resetPasswordData);
            const { success, message } = response;
            if (!success) return thunkAPI.rejectWithValue(message);
            return message;
        } catch (err) {
            const message = err.response.data.message || 'Something went wrong';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(resetPassword.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(resetPasswordCallback.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(resetPasswordCallback.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(resetPasswordCallback.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

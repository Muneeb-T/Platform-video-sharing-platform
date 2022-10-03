import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Register user
export const register = createAsyncThunk(
    'auth/register',
    async (credentials, thunkAPI) => {
        try {
            const response = await authService.register(credentials);
            const { success, message, user } = response;
            console.log(message)
            if (!success) return thunkAPI.rejectWithValue(message);
            return user;
        } catch (err) {
            return thunkAPI.rejectWithValue('Something went wrong');
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
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

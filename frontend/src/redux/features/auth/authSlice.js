import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Get user from localStorage

const initialState = {
    user: null,
    isLoginError: false,
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: '',
    accessToken: '',
    refreshToken: '',
};

// Register user
export const register = createAsyncThunk(
    'AUTH/REGISTER',
    async (credentials, thunkAPI) => {
        try {
            const response = await authService.register(credentials);

            const { success, message } = response;
            if (!success) return thunkAPI.rejectWithValue(message);
            return response;
        } catch (err) {
            const message = err.response.data.message || 'Something went wrong';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const login = createAsyncThunk(
    'AUTH/LOGIN',
    async (credentials, thunkAPI) => {
        try {
            const response = await authService.login(credentials);
            
            const { success, message } = response;
            if (!success) return thunkAPI.rejectWithValue(message);
            return response;
        } catch (err) {
            const message = err.response.data.message || 'Something went wrong';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const facebookAuth = createAsyncThunk(
    'AUTH/FACEBOOK_AUTH',
    async (userData, thunkAPI) => {
        try {
            const response = await authService.facebookAuth(userData);
            const { success, message } = response;
            if (!success) return thunkAPI.rejectWithValue(message);
            return response;
        } catch (err) {
            const message = err.response.data.message || 'Something went wrong';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const googleAuth = createAsyncThunk(
    'AUTH/GOOGLE_AUTH',
    async (code, thunkAPI) => {
        try {
            const response = await authService.googleAuth(code);
            const { success, message } = response;
            if (!success) return thunkAPI.rejectWithValue(message);
            return response;
        } catch (err) {
            const message = err.response.data.message || 'Something went wrong';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const verifyAccount = createAsyncThunk(
    'AUTH/VERIFY_ACCOUNT',
    async (token, thunkAPI) => {
        try {
            const response = await authService.verifyAccount(token);
            const { success, message } = response;
            if (!success) return thunkAPI.rejectWithValue(message);
            return response;
        } catch (err) {
            const message = err.response.data.message || 'Something went wrong';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const refreshToken = createAsyncThunk(
    'AUTH/REFRESH_TOKEN',
    async (_, thunkAPI) => {
        try {
            const refreshToken = thunkAPI.getState().auth.refreshToken;
            const response = await authService.refreshToken(refreshToken);
            const { success, message } = response;
            if (!success) return thunkAPI.rejectWithValue(message);
            return response;
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
            state.message = '';
        },
        logout: (state) => {
            state.accessToken = '';
            state.refreshToken = '';
            state.user = null;
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
                state.user = action.payload.user;
                state.message = action.payload.message;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.message = action.payload.message;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(facebookAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(facebookAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.message = action.payload.message;
            })
            .addCase(facebookAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(googleAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(googleAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.message = action.payload.message;
            })
            .addCase(googleAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(verifyAccount.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(verifyAccount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.message = action.payload.message;
            })
            .addCase(verifyAccount.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
            });
    },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;

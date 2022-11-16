import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import channelService from './channelService';

const initialState = {
    isGetChannelLoading: false,
    isGetChannelError: false,
    isGetChannelSuccess: false,
    isCreateChannelLoading: false,
    isCreateChannelError: false,
    isCreateChannelSuccess: false,
    isFollowChannelLoading: false,
    isFollowChannelError: false,
    isFollowChannelSuccess: false,
    isChannelAnalyticsLoading: false,
    isChannelAnalyticsSuccess: false,
    isChannelAnalyticsError: false,
    isChannelAnalyticsMessage: '',
    channel: null,
    channelLogoUrl: null,
    channelBannerUrl: null,
    channelForm: null,
    message: '',
    analytics: null,
};

export const getChannel = createAsyncThunk(
    'CHANNEL/GET_CHANNEL',
    async (userId, thunkAPI) => {
        try {
            const response = await channelService.getChannel(userId);
            const { success, message } = response;
            if (!success) return thunkAPI.rejectWithValue(message);
            return response;
        } catch (err) {
            const message =
                err?.response?.data?.message || 'Something went wrong';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createChannel = createAsyncThunk(
    'CHANNEL/CREATE_CHANNEL',
    async (channelDetails, thunkAPI) => {
        try {
            const accessToken = thunkAPI.getState().auth.accessToken;
            console.log(accessToken);
            const response = await channelService.createChannel(
                channelDetails,
                accessToken
            );
            const { success, message } = response;
            if (!success) return thunkAPI.rejectWithValue(message);
            return response;
        } catch (err) {
            console.log(err);
            const message =
                err?.response?.data?.message || 'Something went wrong';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const followChannel = createAsyncThunk(
    'CHANNEL/FOLLOW_CHANNEL',
    async (channelAndUser, thunkAPI) => {
        try {
            const accessToken = thunkAPI.getState().auth.accessToken;
            const response = await channelService.followChannel(
                channelAndUser,
                accessToken
            );
            const { success, message } = response;
            if (!success) return thunkAPI.rejectWithValue(message);

            return response;
        } catch (err) {
            console.log(err);
            const message =
                err?.response?.data?.message || 'Something went wrong';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const channelAnalytics = createAsyncThunk(
    'CHANNEL/ANALYTICS',
    async (params, thunkAPI) => {
        try {
            const accessToken = thunkAPI.getState().auth.accessToken;
            const response = await channelService.channelAnalytics(
                params,
                accessToken
            );
            const { success, message } = response;
            console.log(response);
            if (!success) return thunkAPI.rejectWithValue(message);
            return response;
        } catch (err) {
            console.log(err);
            const message =
                err?.response?.data?.message || 'Something went wrong';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const channelSlice = createSlice({
    name: 'channel',
    initialState,
    reducers: {
        reset: (state) => {
            state.isCreateChannelSuccess = false;
            state.isCreateChannelError = false;
            state.isCreateChannelLoading = false;
            state.isFollowChannelSuccess = false;
            state.isFollowChannelError = false;
            state.isFollowChannelLoading = false;
            state.isGetChannelSuccess = false;
            state.isGetChannelError = false;
            state.isGetChannelLoading = false;
            state.channelBannerUrl = null;
            state.channelLogoUrl = null;
            state.channelForm = null;
            state.channel = null;
            state.message = '';
            state.isChannelAnalyticsError = false;
            state.isChannelAnalyticsLoading = false;
            state.isChannelAnalyticsMessage = '';
            state.isChannelAnalyticsSuccess = false;
        },
        setBanner: (state, action) => {
            state.channelBannerUrl = action.payload;
        },
        setChannelForm: (state, action) => {
            console.log(action.payload);
            let { key, value } = action.payload;
            state.channelForm = { ...state.channelForm, [key]: value };
        },
        setChannelLogo: (state, action) => {
            state.channelLogoUrl = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChannel.pending, (state) => {
                state.isGetChannelLoading = true;
            })
            .addCase(getChannel.fulfilled, (state, action) => {
                state.isGetChannelSuccess = true;
                state.channel = action.payload.channel;
                state.message = action.payload.message;
                state.isGetChannelLoading = false;
            })
            .addCase(getChannel.rejected, (state, action) => {
                state.isGetChannelError = true;
                state.message = action.payload;
                state.isGetChannelLoading = false;
            })
            .addCase(createChannel.pending, (state) => {
                state.isCreateChannelLoading = true;
            })
            .addCase(createChannel.fulfilled, (state, action) => {
                state.isCreateChannelSuccess = true;
                state.channel = action.payload.channel;

                state.message = action.payload.message;
                state.isCreateChannelLoading = false;
            })
            .addCase(createChannel.rejected, (state, action) => {
                state.isCreateChannelError = true;
                state.message = action.payload;
                state.isCreateChannelLoading = false;
            })
            .addCase(followChannel.pending, (state) => {
                state.isFollowChannelLoading = true;
            })
            .addCase(followChannel.fulfilled, (state, action) => {
                state.isFollowChannelSuccess = true;
                state.message = action.payload.message;
                state.isFollowChannelLoading = false;
            })
            .addCase(followChannel.rejected, (state, action) => {
                state.isFollowChannelError = true;
                state.message = action.payload;
                state.isFollowChannelLoading = false;
            })
            .addCase(channelAnalytics.pending, (state, action) => {
                state.isChannelAnalyticsLoading = true;
            })
            .addCase(channelAnalytics.fulfilled, (state, action) => {
                state.isChannelAnalyticsSuccess = true;
                state.analytics = action.payload.channelAnalytics;
                state.isChannelAnalyticsMessage = action.payload.message;
                state.isChannelAnalyticsLoading = false;
            })
            .addCase(channelAnalytics.rejected, (state, action) => {
                state.isChannelAnalyticsError = true;
                state.isChannelAnalyticsMessage = action.payload;
                state.isChannelAnalyticsLoading = false;
            });
    },
});

export const { reset, setBanner, setChannelLogo, setChannelForm } =
    channelSlice.actions;
export default channelSlice.reducer;

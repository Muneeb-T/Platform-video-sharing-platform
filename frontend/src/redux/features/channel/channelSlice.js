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
    updateChannelLoading: false,
    updateChannelSuccess: false,
    updateChannelError: false,
    updateChannelMessage: '',
};

export const getChannel = createAsyncThunk('CHANNEL/GET_CHANNEL', async (channel, thunkAPI) => {
    try {
        const accessToken = thunkAPI.getState().auth.accessToken;
        const response = await channelService.getChannel(channel, accessToken);
        const { success, message } = response;
        if (!success) return thunkAPI.rejectWithValue(message);
        return response;
    } catch (err) {
        const message = err?.response?.data?.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(message);
    }
});

export const createChannel = createAsyncThunk(
    'CHANNEL/CREATE_CHANNEL',
    async (channelDetails, thunkAPI) => {
        try {
            const accessToken = thunkAPI.getState().auth.accessToken;
            console.log(accessToken);
            const response = await channelService.createChannel(channelDetails, accessToken);
            const { success, message } = response;
            if (!success) return thunkAPI.rejectWithValue(message);
            return response;
        } catch (err) {
            console.log(err);
            const message = err?.response?.data?.message || 'Something went wrong';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const followChannel = createAsyncThunk(
    'CHANNEL/FOLLOW_CHANNEL',
    async (channelAndUser, thunkAPI) => {
        try {
            const accessToken = thunkAPI.getState().auth.accessToken;
            const response = await channelService.followChannel(channelAndUser, accessToken);
            const { success, message } = response;
            if (!success) return thunkAPI.rejectWithValue(message);

            return response;
        } catch (err) {
            console.log(err);
            const message = err?.response?.data?.message || 'Something went wrong';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const channelAnalytics = createAsyncThunk('CHANNEL/ANALYTICS', async (params, thunkAPI) => {
    try {
        const accessToken = thunkAPI.getState().auth.accessToken;
        const response = await channelService.channelAnalytics(params, accessToken);
        const { success, message } = response;
        console.log(response);
        if (!success) return thunkAPI.rejectWithValue(message);
        return response;
    } catch (err) {
        console.log(err);
        const message = err?.response?.data?.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateChannel = createAsyncThunk('CHANNEL/UPDATE', async (update, thunkAPI) => {
    try {
        console.log(update);
        const accessToken = thunkAPI.getState().auth.accessToken;
        const response = await channelService.updateChannel(update, accessToken);
        const { success, message } = response;
        if (!success) return thunkAPI.rejectWithValue(message);
        return message;
    } catch (err) {
        console.log(err);
        const message = err?.response?.data?.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(message);
    }
});

export const likeChannel = createAsyncThunk('CHANNEL/LIKE', async (details, thunkAPI) => {
    try {
        const accessToken = thunkAPI.getState().auth.accessToken;
        const response = await channelService.likeChannel(details, accessToken);
        const { success, message } = response;
        if (!success) return thunkAPI.rejectWithValue(message);
        return message;
    } catch (err) {
        console.log(err);
        const message = err?.response?.data?.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(message);
    }
});
export const dislikeChannel = createAsyncThunk('CHANNEL/DISLIKE', async (details, thunkAPI) => {
    try {
        const accessToken = thunkAPI.getState().auth.accessToken;
        const response = await channelService.dislikeChannel(details, accessToken);
        const { success, message } = response;
        if (!success) return thunkAPI.rejectWithValue(message);
        return message;
    } catch (err) {
        console.log(err);
        const message = err?.response?.data?.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(message);
    }
});

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
            state.updateChannelLoading = false;
            state.updateChannelSuccess = false;
            state.updateChannelError = false;
            state.updateChannelMessage = '';
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
                if (state.channel) {
                    state.channel.followed = !state.channel?.followed;
                    state.channel.followers += state.channel?.followed ? 1 : -1;
                }

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
            })
            .addCase(updateChannel.pending, (state, action) => {
                state.updateChannelLoading = true;
            })
            .addCase(updateChannel.fulfilled, (state, action) => {
                state.updateChannelLoading = false;
                state.updateChannelSuccess = true;
                state.updateChannelMessage = action.playload;
            })
            .addCase(updateChannel.rejected, (state, action) => {
                state.updateChannelLoading = false;
                state.updateChannelError = true;
                state.updateChannelMessage = action.payload;
            })
            .addCase(likeChannel.fulfilled, (state, action) => {
                const { liked, disliked } = state.channel;
                state.channel.liked = !liked;
                state.channel.likes += !liked ? 1 : -1;
                state.channel.disliked = false;
                state.channel.dislikes -= disliked ? 1 : 0;
                state.channel.message = action.payload;
            })
            .addCase(dislikeChannel.fulfilled, (state, action) => {
                const { liked, disliked } = state.channel;
                state.channel.disliked = !disliked;
                state.channel.dislikes += !disliked ? 1 : -1;
                state.channel.liked = false;
                state.channel.likes -= liked ? 1 : 0;
                state.channel.message = action.payload;
            });
    },
});

export const { reset, setBanner, setChannelLogo, setChannelForm } = channelSlice.actions;
export default channelSlice.reducer;

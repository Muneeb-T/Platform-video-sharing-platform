import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import videoService from './videoService';

// Get user from localStorage

const initialState = {
    isVideoUploadSuccess: false,
    isVideoUploadError: false,
    isVideoUploadLoading: false,
    videoUploadMessage: '',
    videoUrl: '',
    isVideoDetailsSaveSuccess: false,
    isVideoDetailsSaveError: false,
    isVideoDetailsSaveLoading: false,
    videoDetailsSaveMessage: '',
    isVideoDetailsSaved: false,
    uploadingOnProcess: false,
    showVideoUploadModal: false,
    video: {},
    videoUploadProgress: 0,
};

// Register user

export const uploadVideo = createAsyncThunk(
    'VIDEO/UPLOAD',
    async (video, thunkAPI) => {
        try {
            function getProgress(value) {
                thunkAPI.dispatch(
                    videoSlice.actions.setVideoUploadProgress(value)
                );
            }
            const cloudUpload = await videoService.uploadVideo(
                video,
                getProgress
            );
            return cloudUpload;
        } catch (err) {
            const message = "Couldn't upload.Something went wrong.";
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const saveVideoDetails = createAsyncThunk(
    'VIDEO/SAVE_VIDEO_DETAILS',
    async (videoDetails, thunkAPI) => {
        try {
            const response = await videoService.saveVideoDetails(videoDetails);
            const { success, message } = response;
            if (!success) return thunkAPI.rejectWithValue(message);
            return response;
        } catch (err) {
            console.log(err);
            const message = err.response.data.message || 'Something went wrong';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        reset: (state) => {
            state.isVideoUploadSuccess = false;
            state.isVideoUploadError = false;
            state.isVideoDetailsSaveSuccess = false;
            state.isVideoDetailsSaveError = false;
            state.videoDetailsSaveMessage = '';
            state.isVideoDetailsSaved = false;
            state.videoUploadMessage = '';
        },
        setVideoUrl: (state, action) => {
            state.videoUrl = action.payload;
        },
        setVideoDetails: (state, action) => {
            state.video = { ...state.video, details: action.payload };
            state.isVideoDetailsSaved = true;
        },
        setVideoUploadProgress: (state, action) => {
            state.videoUploadProgress = action.payload;
        },
        setUploadingOnProcess: (state, action) => {
            state.uploadingOnProcess = action.payload;
        },
        setShowVideoUploadModal: (state, action) => {
            state.showVideoUploadModal = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadVideo.pending, (state) => {
                state.isVideoUploadLoading = true;
            })
            .addCase(uploadVideo.fulfilled, (state, action) => {
                state.video = { ...state.video, video: action.payload };
                state.videoUploadMessage = 'Video uploaded successfully';
                state.isVideoUploadSuccess = true;
                state.isVideoUploadLoading = false;
            })
            .addCase(uploadVideo.rejected, (state, action) => {
                state.isVideoUploadLoading = false;
                state.isVideoUploadError = true;
                state.videoUploadMessage = action.payload;
            })
            .addCase(saveVideoDetails.pending, (state) => {
                state.isVideoDetailsSaveLoading = true;
            })
            .addCase(saveVideoDetails.fulfilled, (state, action) => {
                state.isVideoDetailsSaveLoading = false;
                state.isVideoDetailsSaveSuccess = true;
                state.videoDetailsSaveMessage = action.payload.message;
            })
            .addCase(saveVideoDetails.rejected, (state, action) => {
                state.isVideoDetailsSaveLoading = false;
                state.isVideoDetailsSaveError = true;
                state.videoDetailsSaveMessage = action.payload;
            });
    },
});

export const { reset, setVideoUrl, setVideoDetails, setUploadingOnProcess, setShowVideoUploadModal } =
    videoSlice.actions;
export default videoSlice.reducer;

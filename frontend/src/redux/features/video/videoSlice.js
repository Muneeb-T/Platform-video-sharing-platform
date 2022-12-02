import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import mongoose from 'mongoose';
import videoService from './videoService';

// Get user from localStorage

const initialState = {
    isVideoUploadSuccess: false,
    isVideoUploadError: false,
    isVideoUploadLoading: false,
    videoUploadMessage: '',
    videoUrl: '',
    videoFilename: '',
    isVideoDetailsSaveSuccess: false,
    isVideoDetailsSaveError: false,
    isVideoDetailsSaveLoading: false,
    videoDetailsSaveMessage: '',
    isVideoDetailsSaved: false,
    uploadingOnProcess: false,
    showVideoUploadModal: false,
    video: {},
    videoUploadProgress: 0,
    videoUploadForm: {},
    uploadedThumbnail: '',
    isGetLatestVideoLoading: false,
    getLatestVideoMessage: '',
    latestVideo: {},
    isGetLatestVideoSuccess: false,
    isGetLatestVideoError: false,
    getVideosLoading: false,
    getVideosSuccess: false,
    videos: [],
    getVideosError: false,
    getVideosMessage: '',
    playbackVideo: null,
    getVideoLoading: false,
    getVideoSuccess: false,
    getVideoError: false,
    getVideoMessage: '',
    updateVideoSuccess: false,
    updateVideoError: false,
    updateVideoLoading: false,
    likeOrDislikeError: false,
    likeOrDislikeLoading: false,
    likeOrDislikeMessage: false,
    viewVideoLoading: false,
    viewVideoError: false,
    viewVideoSuccess: false,
    viewVideoMessage: false,
    getTopVideosSuccess: false,
    getTopVideosLoading: false,
    getTopVideosMessage: '',
    getTopVideosError: false,
    updateVideoMessage: '',
    topVideos: [],
    commentSaveLoading: false,
    commentSaveError: false,
    commentSaveSuccess: false,
    commentSaveMessage: '',
    comments: [],
    saveWatchTimeSuccess: false,
    saveWatchTimeError: false,
    likeOrDislikeCommentLoading: false,
    likeOrDislikeCommentSuccess: false,
    likeOrDislikeCommentError: false,
    selectedVideos: [],
    deleteVideosLoading: false,
    deleteVideosSuccess: false,
    deleteVideosError: false,
    deleteVideosMessage: '',
};

// Register user

export const uploadVideo = createAsyncThunk('VIDEO/UPLOAD', async (video, thunkAPI) => {
    try {
        function getProgress(value) {
            thunkAPI.dispatch(videoSlice.actions.setVideoUploadProgress(value));
        }
        const cloudUpload = await videoService.uploadVideo(video, getProgress);
        return cloudUpload;
    } catch (err) {
        const message = "Couldn't upload.Something went wrong.";
        return thunkAPI.rejectWithValue(message);
    }
});

export const getVideo = createAsyncThunk('VIDEO/GET_VIDEO', async (videoId, thunkAPI) => {
    try {
        const response = await videoService.getVideo(videoId);

        const { success, message } = response;
        if (!success) return thunkAPI.rejectWithValue(message);
        response.video.viewed = false;
        response.video.watchTime = 0;
        return response;
    } catch (err) {
        console.log(err);
        const message = err?.response?.data?.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(message);
    }
});

export const saveVideoDetails = createAsyncThunk(
    'VIDEO/SAVE_VIDEO_DETAILS',
    async (videoDetails, thunkAPI) => {
        try {
            const accessToken = thunkAPI.getState().auth.accessToken;
            const response = await videoService.saveVideoDetails(videoDetails, accessToken);
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

export const getLatestVideo = createAsyncThunk(
    'VIDEO/LATEST_VIDEO',
    async (channelId, thunkAPI) => {
        try {
            const accessToken = thunkAPI.getState().auth.accessToken;
            const response = await videoService.getLatestVideo(channelId, accessToken);
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

export const updateVideo = createAsyncThunk('VIDEO/UPDATE_VIDEO', async (updations, thunkAPI) => {
    try {
        const accessToken = thunkAPI.getState().auth.accessToken;
        const response = await videoService.updateVideo(updations, accessToken);
        const { success, message } = response;

        if (!success) return thunkAPI.rejectWithValue(message);
        return message;
    } catch (err) {
        console.log(err);
        const message = err.response.data.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(message);
    }
});

export const getVideos = createAsyncThunk('VIDEO/GET_VIDEOS', async (searchParams, thunkAPI) => {
    try {
        const accessToken = thunkAPI.getState().auth.accessToken || null;
        const response = await videoService.getVideos(searchParams, accessToken);

        const { success, message } = response;
        if (!success) return thunkAPI.rejectWithValue(message);
        return response;
    } catch (err) {
        const message = err.response.data.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(message);
    }
});

export const setViews = createAsyncThunk('VIDEO/SET_VIEWS', async (viewDetails, thunkAPI) => {
    try {
        const response = await videoService.setViews(viewDetails);
        console.log(response);
        const { success, message } = response;
        if (!success) return thunkAPI.rejectWithValue(message);
        return response;
    } catch (err) {
        console.log(err);
        const message = err.response.data.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(message);
    }
});

export const likeOrDislikeVideo = createAsyncThunk(
    'VIDEO/LIKE_OR_DISLIKE',
    async (likeOrDislike, thunkAPI) => {
        try {
            const accessToken = thunkAPI.getState().auth.accessToken;
            const response = await videoService.likeOrDislikeVideo(likeOrDislike, accessToken);
            const { success, message } = response;
            const { like, dislike } = likeOrDislike;
            if (success) {
                if (like) {
                    return 'liked';
                }
                if (dislike) {
                    return 'disliked';
                }
            }

            return thunkAPI.rejectWithValue(message);
        } catch (err) {
            console.log(err);
            const message = err.response.data.message || 'Something went wrong';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const saveComment = createAsyncThunk('VIDEO/SAVE_COMMENT', async (comment, thunkAPI) => {
    try {
        const accessToken = thunkAPI.getState().auth.accessToken;
        comment.id = mongoose.Types.ObjectId();
        const response = await videoService.saveComment(comment, accessToken);
        const { success, message } = response;
        if (!success) return thunkAPI.rejectWithValue(message);
        const { user } = thunkAPI.getState().auth;
        comment.userId = user;
        return comment;
    } catch (err) {
        console.log(err);
        const message = err.response.data.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(message);
    }
});

export const getTopVideos = createAsyncThunk('VIDEO/TOP_VIDEOS', async (videoDetails, thunkAPI) => {
    try {
        const accessToken = thunkAPI.getState().auth.accessToken;
        const response = await videoService.getVideos(videoDetails, accessToken);
        const { success, message } = response;
        if (!success) return thunkAPI.rejectWithValue(message);
        return response;
    } catch (err) {
        console.log(err);
        const message = err.response.data.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(message);
    }
});

export const saveViewData = createAsyncThunk('VIDEO/SAVE_VIEW_DATA', async (view, thunkAPI) => {
    try {
        const response = await videoService.saveViewData(view);
        const { success, message } = response;
        if (!success) return thunkAPI.rejectWithValue(message);
        return message;
    } catch (err) {
        console.log(err);
        const message = err.response.data.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(message);
    }
});

export const deleteVideos = createAsyncThunk('VIDEO/DELETE_VIDEOS', async (videos, thunkAPI) => {
    try {
        const accessToken = thunkAPI.getState().auth.accessToken;
        const response = await videoService.deleteVideos(videos, accessToken);
        const { success, message } = response;
        if (!success) return thunkAPI.rejectWithValue(message);
        return { videos, message };
    } catch (err) {
        console.log(err);
        const message = err.response.data.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(message);
    }
});

export const likeOrDislikeComment = createAsyncThunk(
    'VIDEO/LIKE_OR_DISLIKE_COMMENT',
    async (likeOrDislike, thunkAPI) => {
        try {
            const accessToken = thunkAPI.getState().auth.accessToken;
            const response = await videoService.likeOrDislikeComment(likeOrDislike, accessToken);
            const { success, message } = response;
            if (!success) return thunkAPI.rejectWithValue(message);
            return likeOrDislike;
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
            state.isVideoUploadLoading = false;
            state.isVideoDetailsSaveLoading = false;
            state.isVideoDetailsSaved = false;
            state.isVideoUploadSuccess = false;
            state.isVideoUploadError = false;
            state.isVideoUploadLoading = false;
            state.isVideoDetailsSaveSuccess = false;
            state.isVideoDetailsSaveError = false;
            state.isVideoDetailsSaveLoading = false;
            state.videoDetailsSaveMessage = '';
            state.isVideoDetailsSaved = false;
            state.isGetLatestVideoLoading = false;
            state.getLatestVideoMessage = '';
            state.isGetLatestVideoSuccess = false;
            state.isGetLatestVideoError = false;
            state.getVideosLoading = false;
            state.getVideosSuccess = false;
            state.getVideosError = false;
            state.getVideosMessage = '';
            state.getVideoLoading = false;
            state.getVideoSuccess = false;
            state.getVideoError = false;
            state.getVideoMessage = '';
            state.updateVideoSuccess = false;
            state.updateVideoError = false;
            state.updateVideoLoading = false;
            state.updateVideoMessage = '';
            state.likeOrDislikeError = false;
            state.likeOrDislikeLoading = false;
            state.likeOrDislikeMessage = false;
            state.viewVideoError = false;
            state.viewVideoLoading = false;
            state.viewVideoSuccess = false;
            state.viewVideoMessage = false;
            state.getTopVideosSuccess = false;
            state.getTopVideosLoading = false;
            state.getTopVideosMessage = '';
            state.getTopVideosError = false;
            state.video = {};
            state.videoUploadProgress = 0;
            state.commentSaveLoading = false;
            state.commentSaveError = false;
            state.commentSaveSuccess = false;
            state.commentSaveMessage = '';
            state.saveWatchTimeError = false;
            state.saveWatchTimeSuccess = false;
            state.likeOrDislikeCommentError = false;
            state.likeOrDislikeCommentLoading = false;
            state.likeOrDislikeCommentSuccess = false;
        },
        setVideoDetails: (state, action) => {
            state.video = { ...state.video, details: action.payload };
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
        setVideoFilename: (state, action) => {
            state.videoUploadForm.title = action.payload;
        },
        setVideoUploadForm: (state, action) => {
            let { key, value } = action.payload;
            if (key.includes('schedule')) {
                key = key.split('.')[1];
                if (key === 'premiere') {
                    if (value === 'true') value = true;
                    else value = false;
                }
                state.videoUploadForm['schedule'] = {
                    ...state.videoUploadForm['schedule'],
                    [key]: value,
                };
            } else {
                state.videoUploadForm[key] = value;
            }
        },
        setVideoUrl: (state, action) => {
            state.videoUrl = action.payload;
        },
        setUploadedThumbnail: (state, action) => {
            state.uploadedThumbnail = action.payload;
        },
        setChannelFollowed: (state, action) => {
            const { followed } = state.playbackVideo?.channel;
            state.playbackVideo.channel.followed = !followed;
            if (followed) {
                state.playbackVideo.channel.followers -= 1;
            } else {
                state.playbackVideo.channel.followers += 1;
            }
        },
        resetVideos: (state) => {
            state.videos = null;
        },
        setWatchTime: (state, action) => {
            state.playbackVideo.watchTime = action.payload;
        },
        resetPlaybackVideo: (state) => {
            state.playbackVideo = null;
        },
        setSelectedVideos: (state, action) => {
            const selectedVideos = state.selectedVideos;
            const videoId = action.payload;
            const videoIndex = selectedVideos.findIndex((element) => element === videoId);
            if (videoIndex === -1) {
                state.selectedVideos = [...selectedVideos, videoId];
            } else {
                state.selectedVideos = selectedVideos.filter((element) => element !== videoId);
            }
        },
        resetSelectedVideos: (state, action) => {
            state.selectedVideos = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadVideo.pending, (state) => {
                state.isVideoUploadError = false;
                state.isVideoUploadSuccess = false;
                state.isVideoUploadLoading = true;
            })
            .addCase(uploadVideo.fulfilled, (state, action) => {
                state.video = { ...state.video, video: action.payload };
                state.videoUploadMessage = 'Video uploaded successfully';
                state.isVideoUploadSuccess = true;
                state.isVideoUploadLoading = false;
            })
            .addCase(uploadVideo.rejected, (state, action) => {
                state.isVideoUploadError = true;
                state.videoUploadMessage = action.payload;
                state.uploadingOnProcess = false;
                state.isVideoUploadLoading = false;
            })
            .addCase(saveVideoDetails.pending, (state) => {
                state.isVideoDetailsSaveSuccess = false;
                state.isVideoDetailsSaveError = false;
                state.isVideoDetailsSaveLoading = true;
            })
            .addCase(saveVideoDetails.fulfilled, (state, action) => {
                state.showVideoUploadModal = false;
                state.videoUploadForm = {};
                state.uploadedThumbnail = '';
                state.videoDetailsSaveMessage = action.payload.message;
                state.isVideoDetailsSaveSuccess = true;
                state.uploadingOnProcess = false;
                state.isVideoDetailsSaveLoading = false;
            })
            .addCase(saveVideoDetails.rejected, (state, action) => {
                state.isVideoDetailsSaveError = true;
                state.videoDetailsSaveMessage = action.payload;
                state.isVideoDetailsSaveLoading = false;
                state.uploadingOnProcess = false;
            })
            .addCase(getLatestVideo.pending, (state) => {
                state.isGetLatestVideoLoading = true;
            })
            .addCase(getLatestVideo.fulfilled, (state, action) => {
                state.isGetLatestVideoSuccess = true;
                state.latestVideo = action.payload.video;
                state.getLatestVideoMessage = action.payload.message;
                state.isGetLatestVideoLoading = false;
            })
            .addCase(getLatestVideo.rejected, (state, action) => {
                state.isGetLatestVideoError = true;
                state.getLatestVideoMessage = action.payload;
                state.isGetLatestVideoLoading = false;
            })
            .addCase(getVideos.pending, (state) => {
                state.getVideosLoading = true;
            })
            .addCase(getVideos.fulfilled, (state, action) => {
                state.getVideosSuccess = true;
                state.videos = action.payload.videos;
                state.getVideosMessage = action.payload.message;
                state.getVideosLoading = false;
            })
            .addCase(getVideos.rejected, (state, action) => {
                state.getVideosError = true;
                state.getVideosMessage = action.payload;
                state.getVideosLoading = false;
            })
            .addCase(getVideo.pending, (state) => {
                state.getVideoLoading = true;
            })
            .addCase(getVideo.fulfilled, (state, action) => {
                state.getVideoSuccess = true;
                state.playbackVideo = action.payload.video;
                state.getVideoMessage = action.payload.message;
                state.getVideoLoading = false;
            })
            .addCase(getVideo.rejected, (state, action) => {
                state.getVideoError = true;
                state.getVideoMessage = action.payload;
                state.getVideoLoading = false;
            })
            .addCase(updateVideo.pending, (state, action) => {
                state.updateVideoSuccess = false;
                state.updateVideoError = false;
                state.updateVideoLoading = true;
            })
            .addCase(updateVideo.fulfilled, (state, action) => {
                state.updateVideoSuccess = true;
                state.updateVideoMessage = action.payload;
                state.updateVideoLoading = false;
            })
            .addCase(updateVideo.rejected, (state, action) => {
                state.updateVideoError = true;
                state.updateVideoLoading = false;
                state.updateVideoMessage = action.payload;
            })
            .addCase(likeOrDislikeVideo.pending, (state, action) => {
                state.likeOrDislikeLoading = true;
            })
            .addCase(likeOrDislikeVideo.fulfilled, (state, action) => {
                const { payload: likedOrDisliked } = action;
                if (likedOrDisliked === 'liked') {
                    if (state.playbackVideo.liked) {
                        state.playbackVideo.likes -= 1;
                        state.playbackVideo.liked = false;
                    } else {
                        state.playbackVideo.likes += 1;
                        state.playbackVideo.liked = true;
                        if (state.playbackVideo.disliked) {
                            state.playbackVideo.dislikes -= 1;
                            state.playbackVideo.disliked = false;
                        }
                    }
                }
                if (likedOrDisliked === 'disliked') {
                    if (state.playbackVideo.disliked) {
                        state.playbackVideo.dislikes -= 1;
                        state.playbackVideo.disliked = false;
                    } else {
                        state.playbackVideo.dislikes += 1;
                        state.playbackVideo.disliked = true;
                        if (state.playbackVideo.liked) {
                            state.playbackVideo.likes -= 1;
                            state.playbackVideo.liked = false;
                        }
                    }
                }

                state.likeOrDislikeLoading = false;
            })
            .addCase(likeOrDislikeVideo.rejected, (state, action) => {
                state.likeOrDislikeError = true;
                state.likeOrDislikeLoading = false;
                state.likeOrDislikeMessage = action.payload;
            })
            .addCase(setViews.pending, (state, action) => {
                state.viewVideoLoading = true;
            })
            .addCase(setViews.fulfilled, (state, action) => {
                state.viewVideoSuccess = true;
                state.playbackVideo.viewed = true;
                state.playbackVideo.views += 1;
                const { authenticatedViewId, unauthenticatedViewId } = action.payload;
                if (authenticatedViewId) {
                    state.playbackVideo.authenticatedViewId = authenticatedViewId;
                }
                if (unauthenticatedViewId) {
                    state.playbackVideo.unauthenticatedViewId = unauthenticatedViewId;
                }
                state.viewVideoMessage = action.payload.message;
                state.viewVideoLoading = false;
            })
            .addCase(setViews.rejected, (state, action) => {
                state.viewVideoLoading = false;
                state.viewVideoError = true;
            })
            .addCase(getTopVideos.pending, (state, action) => {
                state.getTopVideosLoading = true;
            })
            .addCase(getTopVideos.fulfilled, (state, action) => {
                state.getTopVideosSuccess = true;
                state.topVideos = action.payload.videos;
                state.getTopVideosLoading = false;
                state.getTopVideosMessage = action.payload.message;
            })
            .addCase(getTopVideos.rejected, (state, action) => {
                state.getTopVideosError = true;
                state.getTopVideosMessage = action.payload;
                state.getTopVideosLoading = false;
            })
            .addCase(saveComment.pending, (state, action) => {
                state.commentSaveLoading = true;
            })
            .addCase(saveComment.fulfilled, (state, action) => {
                const { id, userId, text, reply } = action.payload;
                if (reply) {
                    const { commentId } = reply;
                    const commentIndex = state.playbackVideo.comments.findIndex(
                        (comment) => comment.id === commentId
                    );
                    state.playbackVideo.comments[commentIndex].replies.push(action.payload);
                } else {
                    state.playbackVideo?.comments?.unshift({
                        id,
                        userId,
                        text,
                        replies: [],
                        createdAt: new Date(),
                        liked: false,
                        disliked: false,
                    });
                }

                state.commentSaveLoading = false;
            })
            .addCase(saveComment.rejected, (state, action) => {
                state.commentSaveError = false;
                state.commentSaveMessage = action.payload;
                state.commentSaveLoading = false;
            })
            .addCase(saveViewData.fulfilled, (state, action) => {
                state.saveWatchTimeSuccess = true;
            })
            .addCase(saveViewData.rejected, (state, action) => {
                state.saveWatchTimeError = true;
            })
            .addCase(likeOrDislikeComment.pending, (state, action) => {
                state.likeOrDislikeCommentLoading = true;
            })
            .addCase(likeOrDislikeComment.fulfilled, (state, action) => {
                const { commentId, like, dislike, reply } = action.payload;
                const commentIndex = state.playbackVideo?.comments.findIndex(
                    (comment) => comment.id == commentId
                );
                if (reply) {
                    let { replyId } = reply;
                    const replyIndex = state.playbackVideo?.comments[
                        commentIndex
                    ].replies.findIndex((reply) => reply.id == replyId);
                    if (like) {
                        const liked =
                            state.playbackVideo?.comments[commentIndex]?.replies[replyIndex]?.liked;
                        if (liked) {
                            state.playbackVideo.comments[commentIndex].replies[
                                replyIndex
                            ].liked = false;
                            state.playbackVideo.comments[commentIndex].replies[
                                replyIndex
                            ].likes -= 1;
                        } else {
                            const disliked =
                                state.playbackVideo?.comments[commentIndex]?.replies[replyIndex]
                                    ?.disliked;
                            if (disliked) {
                                state.playbackVideo.comments[commentIndex].replies[
                                    replyIndex
                                ].disliked = false;
                                state.playbackVideo.comments[commentIndex].replies[
                                    replyIndex
                                ].dislikes -= 1;
                            }
                            state.playbackVideo.comments[commentIndex].replies[
                                replyIndex
                            ].liked = true;
                            state.playbackVideo.comments[commentIndex].replies[
                                replyIndex
                            ].likes += 1;
                        }
                    }
                    if (dislike) {
                        const disliked =
                            state.playbackVideo?.comments[commentIndex]?.replies[replyIndex]
                                ?.disliked;
                        if (disliked) {
                            state.playbackVideo.comments[commentIndex].replies[
                                replyIndex
                            ].disliked = false;
                            state.playbackVideo.comments[commentIndex].replies[
                                replyIndex
                            ].dislikes -= 1;
                        } else {
                            const liked =
                                state.playbackVideo?.comments[commentIndex]?.replies[replyIndex]
                                    ?.liked;
                            if (liked) {
                                state.playbackVideo.comments[commentIndex].replies[
                                    replyIndex
                                ].liked = false;
                                state.playbackVideo.comments[commentIndex].replies[
                                    replyIndex
                                ].likes -= 1;
                            }
                            state.playbackVideo.comments[commentIndex].replies[
                                replyIndex
                            ].dislikes += 1;
                            state.playbackVideo.comments[commentIndex].replies[
                                replyIndex
                            ].disliked = true;
                        }
                    }
                } else {
                    if (like) {
                        const liked = state.playbackVideo?.comments[commentIndex]?.liked;
                        if (liked) {
                            state.playbackVideo.comments[commentIndex].liked = false;
                            state.playbackVideo.comments[commentIndex].likes -= 1;
                        } else {
                            const disliked = state.playbackVideo?.comments[commentIndex]?.disliked;
                            if (disliked) {
                                state.playbackVideo.comments[commentIndex].disliked = false;
                                state.playbackVideo.comments[commentIndex].dislikes -= 1;
                            }
                            state.playbackVideo.comments[commentIndex].liked = true;
                            state.playbackVideo.comments[commentIndex].likes += 1;
                        }
                    }
                    if (dislike) {
                        const disliked = state.playbackVideo?.comments[commentIndex]?.disliked;
                        if (disliked) {
                            state.playbackVideo.comments[commentIndex].disliked = false;
                            state.playbackVideo.comments[commentIndex].dislikes -= 1;
                        } else {
                            const liked = state.playbackVideo?.comments[commentIndex]?.liked;
                            if (liked) {
                                state.playbackVideo.comments[commentIndex].liked = false;
                                state.playbackVideo.comments[commentIndex].likes -= 1;
                            }
                            state.playbackVideo.comments[commentIndex].dislikes += 1;
                            state.playbackVideo.comments[commentIndex].disliked = true;
                        }
                    }
                }
                state.likeOrDislikeCommentLoading = false;
            })
            .addCase(likeOrDislikeComment.rejected, (state, action) => {
                state.likeOrDislikeCommentError = true;
                state.likeOrDislikeLoading = false;
            })
            .addCase(deleteVideos.pending, (state, action) => {
                state.deleteVideosLoading = true;
            })
            .addCase(deleteVideos.fulfilled, (state, action) => {
                const { videos, message } = action.payload;
                state.deleteVideosLoading = false;
                state.videos = state.videos.filter((video) => !videos.includes(video._id));
                state.selectedVideos = [];
                state.deleteVideosSuccess = false;
                state.deleteVideosError = false;
                state.deleteVideosMessage = message;
            })
            .addCase(deleteVideos.rejected, (state, action) => {
                const { message } = action.payload;
                state.deleteVideosMessage = message;
            });
    },
});

export const {
    reset,
    setVideoUrl,
    setVideoDetails,
    setUploadingOnProcess,
    setShowVideoUploadModal,
    setVideoFilename,
    setVideoUploadForm,
    setUploadedThumbnail,
    setPlayVideo,
    resetVideos,
    resetPlaybackVideo,
    setChannelFollowed,
    setWatchTime,
    setSelectedVideos,
    resetSelectedVideos,
} = videoSlice.actions;

export default videoSlice.reducer;

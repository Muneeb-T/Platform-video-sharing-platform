import { config } from 'dotenv';
import mongoose from 'mongoose';
import videoModel from '../models/video/video.js';
import channelModel from '../models/channel/channel.js';
import moment from 'moment';
config();

const saveVideo = async (req, res, next) => {
    try {
        const { body: videoDetails, user, params } = req;
        const { id: authenticatedUserId, channel: requestedChannel } = user;
        const { id: requestedUserId } = params;
        const channel = await channelModel.findById(requestedChannel);
        if (requestedUserId !== authenticatedUserId || !channel) {
            return res.status(401).json({ success: false, message: 'Unautherized access' });
        }

        const video = await videoModel.create({
            ...videoDetails,
            uploadedBy: requestedUserId,
        });
        channel?.videos?.push(video?._id);
        await channel.save();
        res.status(201).json({
            success: true,
            message: 'Video saved successfully',
            video,
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err.message });
    }
};

const updateVideoDetails = async (req, res, next) => {
    try {
        const { id: videoId } = req.params;
        const {
            like,
            dislike,
            title,
            description,
            tags,
            category,
            language,
            visibility,
            thumbnail,
            comment,
            updateComment,
        } = req.body;

        console.log('Request body');
        console.log('=============');
        console.log(req.params);

        const { user: authenticatedUser } = req;
        const { _id: authenticatedUserId } = authenticatedUser;

        let video = await videoModel.findById(videoId).populate('uploadedBy').populate('channel');
        if (!video) {
            return res.status(404).json({ success: false, message: 'Video not found' });
        }

        const check =
            (title || description || tags || category || language || visibility || thumbnail) &&
            video?.uploadedBy?._id.toString() !== authenticatedUserId.toString();

        if (check) {
            return res.status(401).json({ success: false, message: 'Unauthorized access' });
        }

        if (title) {
            video.title = title;
        }
        if (description) {
            video.description = description;
        }
        // if (tags) {
        // }
        if (category) {
            video.category = category;
        }
        if (language) {
            video.language = language;
        }
        if (visibility) {
            video.visibility = visibility;
        }
        if (thumbnail) {
            video.thumbnail = thumbnail;
        }

        if (like) {
            const liked = video?.likedBy?.indexOf(like);
            if (liked === -1) {
                const disliked = video?.dislikedBy?.indexOf(like);
                if (disliked !== -1) video?.dislikedBy?.splice(disliked, 1);
                video?.likedBy.push(like);
            } else {
                video?.likedBy?.splice(liked, 1);
            }
        }
        if (dislike) {
            const disliked = video?.dislikedBy?.indexOf(dislike);
            if (disliked === -1) {
                const liked = video?.likedBy?.indexOf(dislike);
                if (liked !== -1) video?.likedBy?.splice(liked, 1);
                video?.dislikedBy.push(dislike);
            } else {
                video?.dislikedBy?.splice(disliked, 1);
            }
        }

        if (comment) {
            let { userId, text, reply, id } = comment;
            id = mongoose.Types.ObjectId(id);
            if (reply) {
                console.log(comment.reply);
                const { commentId } = reply;
                const commentIndex = video.comments.findIndex((comment) => comment.id == commentId);
                if (commentIndex !== -1) {
                    video.comments[commentIndex].replies.push({ id, ...comment });
                }
            } else {
                video.comments.push(comment);
            }
        }

        if (updateComment) {
            let { commentId, like, dislike, reply } = updateComment;
            const commentIndex = video.comments.findIndex((comment) => comment.id == commentId);
            if (reply) {
                let { replyId } = reply;
                const replyIndex = video.comments[commentIndex].replies.findIndex(
                    (reply) => reply.id == replyId
                );
                if (like) {
                    const liked =
                        video?.comments[commentIndex]?.replies[replyIndex]?.likedBy?.indexOf(like);
                    if (liked === -1) {
                        const disliked =
                            video?.comments[commentIndex]?.replies[replyIndex]?.dislikedBy?.indexOf(
                                like
                            );
                        if (disliked !== -1)
                            video?.comments[commentIndex]?.replies[replyIndex]?.dislikedBy?.splice(
                                disliked,
                                1
                            );
                        video?.comments[commentIndex]?.replies[replyIndex]?.likedBy?.push(like);
                    } else {
                        video?.comments[commentIndex]?.replies[replyIndex]?.likedBy?.splice(
                            liked,
                            1
                        );
                    }
                }
                if (dislike) {
                    const disliked =
                        video?.comments[commentIndex]?.replies[replyIndex]?.dislikedBy?.indexOf(
                            dislike
                        );
                    if (disliked === -1) {
                        const liked =
                            video?.comments[commentIndex]?.replies[replyIndex]?.likedBy?.indexOf(
                                dislike
                            );
                        if (liked !== -1)
                            video?.comments[commentIndex]?.replies[replyIndex]?.likedBy?.splice(
                                liked,
                                1
                            );
                        video?.comments[commentIndex]?.replies[replyIndex]?.dislikedBy.push(
                            dislike
                        );
                    } else {
                        video?.comments[commentIndex]?.replies[replyIndex]?.dislikedBy?.splice(
                            disliked,
                            1
                        );
                    }
                }
            } else {
                if (like) {
                    const liked = video?.comments[commentIndex]?.likedBy?.indexOf(like);
                    if (liked === -1) {
                        const disliked = video?.comments[commentIndex]?.dislikedBy?.indexOf(like);
                        if (disliked !== -1)
                            video?.comments[commentIndex]?.dislikedBy?.splice(disliked, 1);
                        video?.comments[commentIndex]?.likedBy?.push(like);
                    } else {
                        video?.comments[commentIndex]?.likedBy?.splice(liked, 1);
                    }
                }
                if (dislike) {
                    const disliked = video?.comments[commentIndex]?.dislikedBy?.indexOf(dislike);
                    if (disliked === -1) {
                        const liked = video?.comments[commentIndex]?.likedBy?.indexOf(dislike);
                        if (liked !== -1) video?.comments[commentIndex]?.likedBy?.splice(liked, 1);
                        video?.comments[commentIndex]?.dislikedBy.push(dislike);
                    } else {
                        video?.comments[commentIndex]?.dislikedBy?.splice(disliked, 1);
                    }
                }
            }
        }

        await video.save();
        video = video.toObject();
        video.likes = video?.likedBy?.length;
        video.dislikes = video?.dislikedBy?.length;

        res.status(201).json({
            success: true,
            message: 'Video details updated successfully',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

const getVideos = async (req, res, next) => {
    try {
        const authenticatedUser = req?.user?._id;
        const { search, owner, top, category } = req.query;
        const searchObject = { deleted: false };
        if (search) {
            searchObject.title = {
                $regex: `${search}`,
                $options: 'i',
            };
        }
        if (owner) {
            searchObject.uploadedBy = mongoose.Types.ObjectId(owner);
        }

        if (top) {
            searchObject.uploadedBy = mongoose.Types.ObjectId(authenticatedUser);
        }

        let videos = await videoModel
            .find(searchObject)
            .populate('uploadedBy')
            .populate('channel')
            .transform((videos) => {
                let transform = [...videos];
                transform = transform
                    .filter((video) => {
                        let schedule = true;
                        let visibility = true;
                        if (authenticatedUser?.toString() !== video?.uploadedBy?._id.toString()) {
                            if (video?.schedule?.dateTime) {
                                schedule = moment(video?.schedule?.dateTime).isSameOrBefore(
                                    new Date()
                                );
                            }
                            visibility = video?.visibility === 'public';
                        }
                        return schedule && visibility;
                    })
                    .map((video) => {
                        video.likes = video?.likedBy?.length;
                        video.dislikes = video?.dislikedBy?.length;
                        video.views = video?.views.length;
                        return video;
                    });

                if (top) {
                    transform = transform
                        .sort((a, b) => {
                            return b.views - a.views;
                        })
                        .slice(0, top);
                }
                return transform;
            })
            .sort({ createdAt: -1 })
            .lean();

        res.status(200).json({
            success: true,
            videos,
            message: 'Videos fetched successfully',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

const transformComments = (comments, userId) => {
    let transformed = comments?.map((video) => {
        let transform = { ...video };
        transform.likes = transform?.likedBy?.length || 0;
        transform.dislikes = transform?.dislikedBy?.length || 0;
        const userLiked = transform?.likedBy?.findIndex((likedBy) => likedBy == userId);
        if (userLiked !== -1) {
            transform.liked = true;
        } else {
            const userDisliked = transform?.dislikedBy?.findIndex(
                (dislikedBy) => dislikedBy == userId
            );
            if (userDisliked !== -1) {
                transform.disliked = true;
            }
        }
        return transform;
    });
    return transformed;
};

const getVideo = async (req, res, next) => {
    try {
        const { video: videoId, user: userId, channelId, latest, related } = req.query;

        let video = null;
        if (videoId)
            video = await videoModel
                .findById(videoId)
                .populate('uploadedBy')
                .populate('channel')
                .populate('comments.userId')
                .populate('comments.replies.userId');

        if (latest) {
            video = await videoModel
                .findOne(
                    {
                        uploadedBy: mongoose.Types.ObjectId(channelId),
                        visibility: 'public',
                        deleted: false,
                    },
                    {},
                    { sort: { createdAt: -1 } }
                )
                .populate('uploadedBy')
                .populate('channel');
        }

        if (!video) {
            return res.status(404).json({ success: false, message: 'Video not found' });
        }

        async function getRelatedVideos() {
            const { title } = video;
            let keywords = title.split(' ');
            keywords = keywords.filter((keyword) => keyword.length > 4);
            let relatedVideos = await videoModel
                .find({ $regex: { $in: keywords }, visibility: 'public' })
                .populate('uploadedBy')
                .transform((videos) => {
                    let transform = videos.map((video) => {
                        let transformVideo = { ...video.toObject() };
                        transformVideo.views = transformVideo.views.length;
                        return transformVideo;
                    });

                    return transform;
                });
            return relatedVideos;
        }

        const userLiked = video?.likedBy?.includes(userId);
        const userDisliked = video?.dislikedBy?.includes(userId);
        const userFollowed = video?.channel?.followers?.includes(userId);

        video = video.toObject();
        video.likes = video?.likedBy?.length || 0;
        video.dislikes = video?.dislikedBy?.length || 0;
        video.channel.followers = video?.channel?.followers?.length || 0;

        video.comments = transformComments(video.comments, userId);
        video.comments = video?.comments?.map((comment) => {
            let transform = { ...comment };
            transform.replies = transformComments(transform.replies, userId);
            return transform;
        });

        if (latest) {
            const { views } = video;
            video.averageViewDuration =
                views.reduce((previousDuration, view) => previousDuration + view.duration, 0) /
                views.length;
        }

        if (userId && video && (video.likes || video.dislikes || video.channel.followers)) {
            if (userLiked) {
                video.liked = true;
            } else {
                if (userDisliked) {
                    video.disliked = true;
                }
            }
            if (userFollowed) {
                video.channel.followed = true;
            }
        }

        video.views = video?.views?.length || 0;
        if (related) {
            video.relatedVideos = await getRelatedVideos();
        }

        res.status(200).json({
            success: true,
            video,
            message: 'Video fetched successfully',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

const updateVideoDetailsNotProtected = async (req, res, next) => {
    try {
        const { id: videoId } = req.params;
        const { view, viewData } = req.body;
        const responseObject = {};

        let video = await videoModel.findById(videoId);
        if (!video) {
            return res.status(404).json({ success: true, message: 'Video not found' });
        }

        //if updation is to create new view
        if (view) {
            const { authenticatedView: authenticated, userId } = view;
            const viewId = new mongoose.Types.ObjectId();
            video.views.push({
                viewId,
                viewer: userId || null,
                authenticated,
            });
            responseObject.authenticatedViewId = viewId;
        }

        if (viewData) {
            const { authenticatedView, viewId, duration } = viewData;
            if (authenticatedView) {
                const viewIndex = video.views.findIndex((view) => view.viewId == viewId);
                if (viewIndex !== -1) {
                    video.views[viewIndex].duration = duration;
                }
            }
        }

        await video.save();

        res.status(201).json({
            success: true,
            ...responseObject,
            message: 'Video updated successfully',
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err.message });
    }
};

const deleteVideos = async (req, res, next) => {
    try {
        const { user, body: videoIds } = req;

        const videos = await videoModel.find({ _id: { $in: videoIds } }).select({ uploadedBy: 1 });

        videos.forEach(async (video) => {
            video.deleted = true;
            await video.save();
        });

        res.status(201).json({ success: true, message: 'Videos deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

export {
    saveVideo,
    updateVideoDetails,
    getVideos,
    getVideo,
    updateVideoDetailsNotProtected,
    deleteVideos,
};

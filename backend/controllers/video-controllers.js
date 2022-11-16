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
        console.log(req.body);

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
        let newCommentIndex = null;
        let commentReplyDetails = null;
        if (comment) {
            console.log('Comment reply');
            console.log(comment);
            let { userId } = comment;
            userId = mongoose.Types.ObjectId(userId);
            if (comment.reply) {
                let commentIndex = video?.comments?.findIndex(
                    (singleComment) => singleComment._id == comment.reply
                );
                console.log(commentIndex);
                let replyId = new mongoose.Types.ObjectId();
                video?.comments[commentIndex].replies.push({
                    ...comment,
                    replyId,
                    userId,
                });
                commentReplyDetails = { commentIndex, replyId };
            } else {
                newCommentIndex = video?.comments?.push({ ...comment, userId }) - 1;
            }
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

        if (updateComment) {
            console.log(updateComment);
            const { comments } = video;
            const { commentId, likedBy, dislikedBy, reply } = updateComment;
            const commentIndex = comments.findIndex((comment) => comment._id == commentId);
            console.log(commentIndex);
            if (reply) {
                const replyIndex = comments[commentIndex].replies.findIndex(
                    (singleReply) => singleReply?._id == reply
                );
                console.log(replyIndex);
                if (likedBy) {
                    const liked =
                        comments[commentIndex]?.replies[replyIndex]?.likedBy?.indexOf(likedBy);
                    if (liked === -1) {
                        const disliked =
                            comments[commentIndex]?.replies[replyIndex]?.dislikedBy?.indexOf(
                                likedBy
                            );
                        if (disliked !== -1)
                            video?.comments[commentIndex]?.replies[replyIndex]?.dislikedBy?.splice(
                                disliked,
                                1
                            );
                        video?.comments[commentIndex]?.replies[replyIndex]?.likedBy.push(likedBy);
                    } else {
                        video?.comments[commentIndex]?.replies[replyIndex]?.likedBy?.splice(
                            likedBy,
                            1
                        );
                    }
                }
                if (dislikedBy) {
                    const disliked = comments[commentIndex]?.dislikedBy?.indexOf(dislikedBy);
                    if (disliked === -1) {
                        const liked = comments[commentIndex]?.likedBy?.indexOf(dislikedBy);
                        if (liked !== -1)
                            video?.comments[commentIndex]?.likedBy?.splice(likedBy, 1);
                        video?.comments[commentIndex]?.dislikedBy.push(dislikedBy);
                    } else {
                        video?.comments[commentIndex]?.dislikedBy?.splice(dislikedBy, 1);
                    }
                }
            } else {
                if (likedBy) {
                    const liked = comments[commentIndex]?.likedBy?.indexOf(likedBy);
                    if (liked === -1) {
                        const disliked = comments[commentIndex]?.dislikedBy?.indexOf(likedBy);
                        if (disliked !== -1)
                            video?.comments[commentIndex]?.dislikedBy?.splice(disliked, 1);
                        video?.comments[commentIndex]?.likedBy.push(likedBy);
                    } else {
                        video?.comments[commentIndex]?.likedBy?.splice(likedBy, 1);
                    }
                }
                if (dislikedBy) {
                    const disliked = comments[commentIndex]?.dislikedBy?.indexOf(dislikedBy);
                    if (disliked === -1) {
                        const liked = comments[commentIndex]?.likedBy?.indexOf(dislikedBy);
                        if (liked !== -1)
                            video?.comments[commentIndex]?.likedBy?.splice(likedBy, 1);
                        video?.comments[commentIndex]?.dislikedBy.push(dislikedBy);
                    } else {
                        video?.comments[commentIndex]?.dislikedBy?.splice(dislikedBy, 1);
                    }
                }
            }
        }

        await video.save();
        video = video.toObject();
        video.likes = video?.likedBy?.length;
        video.dislikes = video?.dislikedBy?.length;

        const responseObject = {
            newCommentId: newCommentIndex ? video.comments[newCommentIndex]._id : null,
            commentReplyDetails,
        };
        res.status(201).json({
            success: true,
            ...responseObject,
            message: 'Video details updated successfully',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

const getVideos = async (req, res, next) => {
    try {
        console.log(req.body);
        const authenticatedUser = req?.user?._id;
        const { search, owner, top, category } = req.query;
        const searchObject = {};
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
        const { video: videoId, user: userId, channelId, latest } = req.query;

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
                    { uploadedBy: mongoose.Types.ObjectId(channelId), visibility: 'public' },
                    {},
                    { sort: { createdAt: -1 } }
                )
                .populate('uploadedBy')
                .populate('channel');
        }

        if (!video) {
            return res.status(404).json({ success: false, message: 'Video not found' });
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
            console.log(transform.replies);
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

        video.views = video.views.length || 0;
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
        res.status(500).json({ success: false, message: err.message });
    }
};

export { saveVideo, updateVideoDetails, getVideos, getVideo, updateVideoDetailsNotProtected };

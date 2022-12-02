import { config } from 'dotenv';
import channelModel from '../models/channel/channel.js';
import accountModel from '../models/user/user.js';
import mongoose from 'mongoose';
config();

const createChannel = async (req, res, next) => {
    try {
        const { id: authenticatedUserId } = req.user;
        const { body: channelDetails } = req;
        const { userId: requestedUserId } = channelDetails;
        if (authenticatedUserId !== requestedUserId) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized access',
            });
        }
        const { channelLogo, channelName, ...otherDetails } = channelDetails;

        const channel = await channelModel.create({
            owner: authenticatedUserId,
            ...otherDetails,
        });

        if (channelLogo || channelName) {
            let accountUpdateObject = { channel: channel._id };
            if (channelLogo) {
                accountUpdateObject.profilePicture = channelLogo;
            }
            if (channelName) {
                accountUpdateObject.username = channelName;
            }
            await accountModel.findByIdAndUpdate(requestedUserId, {
                ...accountUpdateObject,
            });
        }

        res.status(200).json({
            success: true,
            message: 'Channel created successfully',
            channel,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

const getChannel = async (req, res, next) => {
    try {
        const { _id: authenticatedUserId } = req.user;
        const { id } = req.params;
        const { videos, playlists } = req.query;
        let channel = await channelModel
            .findOne({
                $or: [{ owner: mongoose.Types.ObjectId(id) }, { _id: mongoose.Types.ObjectId(id) }],
            })
            .populate('owner')
            .populate('featuredVideo')
            .populate('channelTrailer');

        if (!channel) {
            return res.status(404).json({ success: false, message: 'Channel not found' });
        }
        let requestedVideos = {};
        if (videos) {
            channel = await channel.populate({ path: 'videos', visibility: 'public' });
            const { categories } = JSON.parse(videos);
            const { videos: channelVideos } = channel;
            if (channelVideos.length) {
                categories.forEach((category) => {
                    if (category === 'popular') {
                        requestedVideos['popular videos'] = channelVideos.filter((video) => {
                            console.log(video.views.length);
                            return video.views.length > 5;
                        });
                    }
                    if (category === 'uploads') {
                        requestedVideos['uploads'] = channelVideos.sort(
                            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                        );
                    }
                });
            }
        }

        const userFollowed = channel?.followers?.includes(authenticatedUserId);
        const userLiked = channel?.likedBy?.includes(authenticatedUserId);
        const userDisliked = channel?.dislikedBy?.includes(authenticatedUserId);
        channel = channel.toObject();
        channel.followers = channel?.followers?.length;
        channel.likes = channel?.likedBy?.length || 0;
        channel.dislikes = channel?.dislikedBy?.length || 0;
        channel.followed = userFollowed;
        channel.liked = userLiked;
        channel.disliked = userDisliked;
        if (Object.keys(requestedVideos).length) {
            channel.requestedVideos = requestedVideos;
        }

        res.status(200).json({
            success: true,
            message: 'Fetched channel successfully',
            channel,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

const updateChannel = async (req, res, next) => {
    try {
        console.log('req-body');
        console.log(req.body);
        console.log('paramse');
        console.log(req.params);
        const { user, body, params } = req;
        const { id: channelId } = params;
        const { _id: userId, role } = user;

        const channel = await channelModel.findById(channelId);

        if (!channel) {
            return res.status(404).json({ success: false, message: 'Channel not found' });
        }
        if (userId.toString() !== channel.owner.toString() && role !== 'admin') {
            return res
                .status(401)
                .json({ success: false, message: 'Unautherized access.Channel not matching' });
        }
        const {
            channelName,
            description,
            links,
            linksOnBanner,
            contact,
            remove,
            watermark,
            banner,
            channelLogo,
            featuredVideo,
            channelTrailer,
        } = body;
        if (channelName) {
            await accountModel.findByIdAndUpdate(userId, { username: channelName });
        }
        if (description) {
            channel.description = description;
        }
        if (links) {
            console.log('This is links');
            console.log(links);
            links.forEach((link) => {
                if (Object.keys(link).length) {
                    const linkIndex = channel.links.findIndex((element) => element._id == link._id);
                    if (linkIndex === -1) {
                        channel.links.push(link);
                    } else {
                        channel.links[linkIndex] = link;
                    }
                }
            });
        }
        if (linksOnBanner) {
            channel.linksOnBanner = Number(linksOnBanner);
        }
        if (contact) {
            const { email, phoneNumber } = contact;
            if (channel?.contact?.email !== email) {
                channel.contact.email = email;
            }
            if (channel?.contact?.phoneNumber !== phoneNumber) {
                channel.contact.phoneNumber = phoneNumber;
            }
        }

        if (watermark) {
            channel.watermark = watermark;
        }
        if (channelLogo) {
            await accountModel.findByIdAndUpdate(userId, { profilePicture: channelLogo });
        }
        if (banner) {
            channel.banner = banner;
        }

        if (featuredVideo) {
            channel.featuredVideo = mongoose.Types.ObjectId(featuredVideo);
        }
        if (channelTrailer) {
            channel.channelTrailer = mongoose.Types.ObjectId(channelTrailer);
        }

        if (remove) {
            const {
                channelLogo: removeChannelLogo,
                watermark: removeWatermark,
                banner: removeBanner,
                channelTrailer: removeChannelTrailer,
                featuredVideo: removeFeaturedVideo,
            } = remove;

            if (removeChannelLogo) {
                await accountModel.findByIdAndUpdate(userId, {
                    profilePicture: null,
                    'googleAccount.picture': null,
                    'facebookAccount.picture': null,
                });
            }
            if (removeWatermark) {
                channel.watermark = null;
            }
            if (removeBanner) {
                channel.banner = null;
            }
            if (removeChannelTrailer) {
                channel.channelTrailer = null;
            }
            if (removeFeaturedVideo) {
                channel.featuredVideo = null;
            }
        }
        await channel.save();
        res.status(200).json({ success: true, message: 'Channel updated successfully' });
    } catch (err) {
        console.log(err)
        // console.log('\nChannel update error');
        // console.log('=====================');
        // console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

const updateChannelNotProtected = async (req, res) => {
    try {
        console.log(req.body);

        const { id: channelId } = req.params;
        const { _id: authenticatedUser } = req.user;
        const { like, dislike } = req.body;
        const channel = await channelModel.findById(channelId);
        if (!channel) {
            return res.status(404).json({ success: false, message: 'Channel not found' });
        }
        if (like) {
            if (authenticatedUser != like) {
                return res.status(401).json({ success: false, message: 'Unauthorized access' });
            }
            const { likedBy, dislikedBy } = channel;
            const liked = likedBy?.includes(like);
            if (liked) {
                channel.likedBy = likedBy.filter((likedUser) => likedUser != like);
            } else {
                channel.likedBy.push(like);
                channel.dislikedBy = dislikedBy?.filter((dislikedUser) => dislikedUser != like);
            }
        }
        if (dislike) {
            if (authenticatedUser != dislike) {
                return res.status(401).json({ success: false, message: 'Unauthorized access' });
            }
            const { likedBy, dislikedBy } = channel;
            const disliked = dislikedBy?.includes(dislike);
            if (disliked) {
                channel.dislikedBy = dislikedBy.filter((dislikedUser) => dislikedUser != dislike);
            } else {
                channel.dislikedBy.push(dislike);
                channel.likedBy = likedBy?.filter((likedUser) => likedUser != dislike);
            }
        }
        await channel.save();
        res.status(201).json({ success: true, message: 'Channel updated successfully' });
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err.message });
    }
};

const followChannel = async (req, res, next) => {
    try {
        console.log(req.body);
        const { user: requestedUserId, follow: channelId } = req.body;
        const { _id: authenticatedUserId } = req.user;
        if (requestedUserId.toString() !== authenticatedUserId.toString()) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access',
            });
        }
        let channel = await channelModel.findById(channelId);
        let user = await accountModel.findById(requestedUserId);
        if (!channel || !user) {
            return res.status(404).json({
                success: false,
                message: 'Channel or user not found',
            });
        }

        const followed = channel?.followers?.indexOf(requestedUserId);
        if (followed !== -1) {
            channel?.followers?.splice(requestedUserId, 1);
        } else {
            channel?.followers?.push(requestedUserId);
        }
        const following = user?.following?.indexOf(requestedUserId);
        if (following !== -1) {
            user?.following?.splice(requestedUserId, 1);
        } else {
            user?.following?.push(channelId);
        }

        await channel.save();
        await user.save();

        res.status(201).json({
            success: true,
            message: 'Channel followed successfully',
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const channelAnalytics = async (req, res, next) => {
    try {
        console.log('channel analytics');
        console.log(req.query);
        console.log(req.params);
        const { id: owner } = req.params;
        let { totalViews, totalWatchTime } = req.query;
        const { _id: authenticatedUserId } = req.user;
        if (owner.toString() !== authenticatedUserId.toString()) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access',
            });
        }
        const channel = await channelModel.findOne({ owner }).populate('videos');
        if (!channel) {
            return res.status(404).json({ success: false, message: 'No such channel found' });
        }
        const { videos } = channel;
        const responseObject = {};
        if (totalViews) {
            totalViews = videos.reduce((previous, video) => {
                console.log(video.deleted);
                if (video.deleted === false) return previous + video.views.length;
                return previous;
            }, 0);
            responseObject.totalViews = totalViews;
        }
        if (totalWatchTime) {
            const singleViewDuration = (previousViewDuration, view) => {
                return previousViewDuration + view.duration;
            };
            const totalViewDuraion = (previousVideoViewDuration, video) => {
                if (video.deleted === false) {
                    const currentVideoViewDuration = video.views.reduce(singleViewDuration, 0);
                    return previousVideoViewDuration + currentVideoViewDuration;
                }
                return previousVideoViewDuration;
            };
            const totalWatchTime = videos.reduce(totalViewDuraion, 0) || 0;
            responseObject.totalWatchTime = totalWatchTime;
        }
        res.status(200).json({
            success: true,
            channelAnalytics: responseObject,
            message: 'Fetched channal analytics successfully',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

export {
    getChannel,
    updateChannel,
    createChannel,
    followChannel,
    channelAnalytics,
    updateChannelNotProtected,
};

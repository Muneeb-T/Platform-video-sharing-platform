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
        console.log('get');
        const { id } = req.params;
        console.log(id);
        let channel = await channelModel.findOne({
            $or: [{ owner: mongoose.Types.ObjectId(id) }, { _id: mongoose.Types.ObjectId(id) }],
        });

        console.log(channel);

        if (!channel) {
            return res.status(404).json({ success: false, message: 'Channel not found' });
        }
        channel = channel.toObject();

        channel.followers = channel?.followers?.length;
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
        // console.log('\nPOST : Update channel');
        // console.log('\nRequest parms');
        // console.log('==============');
        // console.log('Channel ID : ', req.params.id);
        // console.log('\nRequest body');
        // console.log('============');
        console.log(req.files);

        const { user, body, params, files } = req;
        const { id: channelId } = params;
        const { id: userId, role } = user;
        const { channelLogo, banners, watermark } = files;
        const { email } = body;

        if (channelId !== userId && role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Unautherized access' });
        }

        // console.log('\nFiles for update');
        // console.log('================');
        // console.log(files);

        const update = { ...body };
        if (email) {
            update.email = { verified: true, address: email };
        }
        if (channelLogo && channelLogo[0]) {
            update.channelLogo = channelLogo[0];
        }
        console.log(banners);
        if (watermark && watermark[0]) {
            update.watermark = watermark[0];
        }

        try {
            await channelModel.findByIdAndUpdate(channelId, { ...update }, { runValidators: true });

            res.status(200).json({
                success: true,
                message: 'Channel updated successfully',
            });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    } catch (err) {
        // console.log('\nChannel update error');
        // console.log('=====================');
        // console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

const followChannel = async (req, res, next) => {
    try {
        console.log(req.body);
        const { user: requestedUserId, follow: channelId } = req.body;
        const { _id: authenticatedUserId } = req.user;
        console.log(requestedUserId);
        console.log(authenticatedUserId);
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
            totalViews = videos.reduce((previous, video) => previous + video.views.length, 0);
            responseObject.totalViews = totalViews;
        }
        if (totalWatchTime) {
            const singleViewDuration = (previousViewDuration, view) => {
                return previousViewDuration + view.duration;
            };
            const totalViewDuraion = (previousVideoViewDuration, video) => {
                const currentVideoViewDuration = video.views.reduce(singleViewDuration, 0);
                return previousVideoViewDuration + currentVideoViewDuration;
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

export { getChannel, updateChannel, createChannel, followChannel, channelAnalytics };

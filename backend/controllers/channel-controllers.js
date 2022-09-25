import { config } from 'dotenv';
import channelModel from '../models/channel/channel.js';
config();

const getUser = async (req, res, next) => {
    try {
        // console.log('\nGET : Get user');
        // console.log('\nRequested user Id');
        // console.log('===================');
        // console.log('User ID : ', req.user.id);

        const { id: channelId } = req.params;
        const { user: requestedUser } = req;
        const { id: userId, role } = requestedUser;

        if (channelId !== userId || role !== 'admin') {
            return res
                .status(401)
                .json({ success: false, message: 'Unautherized access' });
        }

        const user = await channelModel.findById(channelId).select({
            username: 1,
            email: 1,
            phone: 1,
            gender: 1,
            country: 1,
            dateOfBirth: 1,
            googleAccount: 1,
            facebookAccount: 1,
            channelLogo: 1,
        });

        res.status(200).json({
            success: true,
            message: 'Fetched user details succesfully',
            user,
        });
    } catch (err) {
        // console.log('\nGet user error');
        // console.log('===============');
        // console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

const getChannel = async (req, res, next) => {
    try {
        // console.log('\nGET : Get channel');
        // console.log('\nRequest parms');
        // console.log('==============');
        // console.log('User ID : ', req.user.id);
        const { id: channelId } = req.params;
        const { user } = req;
        const { id: userId, role } = user;

        if (channelId !== userId || role !== 'admin') {
            return res
                .status(401)
                .json({ success: false, message: 'Unautherized access' });
        }

        const channel = await channelModel.findById(channelId).select({
            channelLogo: 1,
            username: 1,
            description: 1,
            links: 1,
            linksOnBanner: 1,
            contact: 1,
        });
        res.status(200).json({
            success: true,
            message: 'Fetched channel details succesfully',
            channel,
        });
    } catch (err) {
        // console.log('\nGet channel error');
        // console.log('===============');
        // console.log(err);
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

        const { id: channelId } = params;
        const { user, body, params, files } = req;
        const { id: userId, role } = user;
        const { channelLogo, banners, watermark } = files;

        if (channelId !== userId || role !== 'admin') {
            return res
                .status(401)
                .json({ success: false, message: 'Unautherized access' });
        }

        // console.log('\nFiles for update');
        // console.log('================');
        // console.log(files);

        const update = { ...body };
        if (channelLogo && channelLogo[0]) {
            update.channelLogo = channelLogo[0];
        }
        if (watermark && watermark[0]) {
            update.watermark = watermark[0];
        }

        try {
            await channelModel.findByIdAndUpdate(
                id,
                { ...update },
                { runValidators: true }
            );

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
export { getUser, getChannel, updateChannel };

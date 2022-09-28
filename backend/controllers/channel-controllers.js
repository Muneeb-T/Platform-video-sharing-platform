import { config } from 'dotenv';
import channelModel from '../models/channel/channel.js';
config();

const getChannel = async (req, res, next) => {
    try {
        // console.log('\nGET : Get channel');
        // console.log('\nRequest parms');
        // console.log('==============');
        // console.log('User ID : ', req.user.id);
        const { id: channelId } = req.params;
        const { user } = req;
        const { id: userId, role } = user;

        if (channelId !== userId && role !== 'admin') {
            return res
                .status(404)
                .json({ success: false, message: 'Page not found' });
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

        const { user, body, params, files } = req;
        const { id: channelId } = params;
        const { id: userId, role } = user;
        const { channelLogo, banners, watermark } = files;
        const { email } = body;

        if (channelId !== userId && role !== 'admin') {
            return res
                .status(401)
                .json({ success: false, message: 'Unautherized access' });
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
            await channelModel.findByIdAndUpdate(
                channelId,
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
export { getChannel, updateChannel };

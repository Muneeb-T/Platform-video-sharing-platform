import mongoose from 'mongoose';
import emailValidator from 'email-validator';
import linkModel from './link.js';
import imageFileModel from '../file/image-file.js';
import videoFileModel from '../file/video-file.js';
import findOneOrCreate from 'mongoose-find-one-or-create';

const { Schema } = mongoose;
const channelSchema = new Schema(
    {
        owner: { type: mongoose.Types.ObjectId, ref: 'User' },
        description: {
            type: String,
            maxLength: [
                1000,
                'Description exceeds the limit (1000 characters only).',
            ],
        },
        links: {
            type: [linkModel],
            default: [],
        },
        linksOnBanner: {
            type: Number,
            max: [
                5,
                'Number of links for displaying on banner exceeds the limit (5 links only).',
            ],
            min: [
                0,
                'Number of links for displaying on banner must be between 0 and 5.',
            ],
        },
        contact: {
            phoneNumber: {
                type: String,
                index: false,
            },
            email: {
                type: String,
                validate: {
                    validator: function (email) {
                        return emailValidator.validate(email);
                    },
                    message: 'Enter valid email address.',
                },
                index: false,
            },
        },
        //branding
        banner: { type: imageFileModel },
        watermark: { type: imageFileModel },
        followers: {
            type: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
            default: [],
        },
        videos: {
            type: [{ type: mongoose.Types.ObjectId, ref: 'Video' }],
            default: [],
        },
    },
    { timestamps: true }
);

channelSchema.plugin(findOneOrCreate);

export default mongoose.model('Channel', channelSchema);

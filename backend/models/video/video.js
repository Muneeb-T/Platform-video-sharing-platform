// @ts-nocheck
import mongoose from 'mongoose';
import imageFileModel from '../file/image-file.js';
import videoFileModel from '../file/video-file.js';
import commentModel from '../comment/comment.js';
const { Schema } = mongoose;
const videoSchema = new Schema(
    {
        video: { type: videoFileModel },
        visibility: {
            type: String,
            default: 'private',
            enum: {
                values: ['public', 'private', 'unlisted'],
                message: 'Enter valid visibility',
            },
        },
        title: { type: String },
        description: { type: String },
        tags: [{ type: String }],
        category: { type: String },
        language: { type: String },
        thumbnail: { type: imageFileModel },
        uploadedBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        channel: {
            type: mongoose.Types.ObjectId,
            ref: 'Channel',
            required: true,
        },
        schedule: {
            premiere: { type: Boolean },
            dateTime: { type: Date, default: null },
        },
        likedBy: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
        dislikedBy: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
        views: {
            type: [
                {
                    authenticated: { type: Boolean, default: false },
                    viewId: { type: mongoose.Types.ObjectId },
                    viewer: {
                        type: mongoose.Types.ObjectId,
                        ref: 'User',
                        default: null,
                    },
                    duration: { type: Number, default: 0 },
                },
            ],
            default: [],
        },
        comments: { type: [commentModel] },
    },
    { timestamps: true }
);

export default mongoose.model('Video', videoSchema);

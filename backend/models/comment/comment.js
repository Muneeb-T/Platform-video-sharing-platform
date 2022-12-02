// @ts-nocheck
import mongoose from 'mongoose';

const { Schema } = mongoose;
const replySchema = new Schema(
    {
        id: { type: mongoose.Types.ObjectId },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        text: { type: String },
        likedBy: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
        dislikedBy: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    },
    { timestamps: true }
);
const commentSchema = new Schema(
    {
        id: { type: mongoose.Types.ObjectId },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        text: { type: String },
        likedBy: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
        dislikedBy: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
        replies: { type: [replySchema], default: [] },
    },
    { timestamps: true }
);

export default commentSchema;

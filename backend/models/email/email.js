// @ts-nocheck
import mongoose from 'mongoose';

const { Schema } = mongoose;
const emailSchema = new Schema(
    {
        sentTo: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        messageId: { type: String },
        envelope: {
            from: { type: String },
            to: [{ type: String }],
        },
        response: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model('Email', emailSchema);

import mongoose from 'mongoose';

const { Schema } = mongoose;

const fileSchema = new Schema(
    {
        asset_id: { type: String },
        public_id: { type: String },
        version: { type: Number },
        version_id: { type: String },
        signature: { type: String },
        width: { type: Number },
        height: { type: Number },
        format: { type: String },
        resource_type: { type: String },
        tags: [{ type: String }],
        pages: { type: Number },
        bytes: { type: Number },
        type: { type: String },
        etag: { type: String },
        placeholder: { type: Boolean },
        url: { type: String },
        secure_url: { type: String },
        folder: { type: String },
        access_mode: { type: String },
        audio: { type: Object },
        video: {
            pix_format: { type: String },
            codec: { type: String },
            level: { type: Number },
            profile: { type: String },
            bit_rate: { type: String },
            time_base: { type: String },
        },
        frame_rate: { type: Number },
        bit_rate: { type: Number },
        duration: { type: Number },
        rotation: { type: Number },
        original_filename: { type: String },
        nb_frames: { type: Number },
    },
    { timestamps: true }
);

export default fileSchema;

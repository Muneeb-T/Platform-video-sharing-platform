import mongoose from 'mongoose';

const { Schema } = mongoose;

const fileSchema = new Schema(
    {
        access_mode: { type: String },
        asset_id: { type: String },
        bytes: { type: Number },
        created_at: { type: String },
        etag: { type: String },
        folder: { type: String },
        format: { type: String },
        height: { type: String },
        original_filename: { type: String },
        placeholder: { type: Boolean },
        public_id: { type: String },
        resource_type: { type: String },
        secure_url: { type: String },
        signature: { type: String },
        tags: [{ type: String }],
        type: { type: String },
        url: { type: String },
        version: { type: Number },
        version_id: { type: String },
        width: { type: Number },
    },
    { timestamps: true }
);

export default fileSchema;

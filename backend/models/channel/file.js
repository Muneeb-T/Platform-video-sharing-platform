import mongoose from 'mongoose';

const { Schema } = mongoose;

const fileSchema = new Schema(
    {
        fieldname: { type: String },
        originalname: { type: String },
        mimetype: { type: String },
        filename: { type: String },
        path: { type: String },
    },
    { timestamps: true }
);

export default fileSchema;

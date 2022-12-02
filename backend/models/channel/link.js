import mongoose from 'mongoose';

const { Schema } = mongoose;

const linkSchema = new Schema({
    title: {
        type: String,
        maxLength: 30,
    },
    url: {
        type: String,
    },
});

export default linkSchema;

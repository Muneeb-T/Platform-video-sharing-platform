// @ts-nocheck
import multer from 'multer';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { config } from 'dotenv';
import path from 'path';
config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: async (req, file) => {
        try {
            console.log("hello")
            console.log(req.file)
            return {
                folder: 'Platform',
                format: path.extname(file.originalname).substring(1),
                public_id: file.filename,
            };
        } catch (err) {
            console.log(err);
        }
    },
});

export default multer({ storage });

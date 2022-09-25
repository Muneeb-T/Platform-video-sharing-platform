// @ts-nocheck
import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

const uri = process.env.MONGO_URI;
// let gfsBucket = { };

// mongoose.connection.once('connected', () => {
//     try {
//         const db = mongoose.connections[0].db;
//         gfsBucket = new mongoose.mongo.GridFSBucket(db, {
//             bucketName: 'uploads',
//         });

//         console.log('\nGridfs bucket connection success');
//         console.log('=================================');
//     } catch (err) {
//         console.log('\nGridfs bucket connection error');
//         console.log('==============================');
//         console.log(err);
//     }
// });

async function connectDatabase() {
    try {
        const dbName = process.env.DATABASE_NAME;
        await mongoose.connect(uri);
        console.log('\nMongoose connection success');
        console.log('===========================');
        console.log(`MONGO_URI : ${uri}`);
    } catch (error) {
        console.log('\nMongoose connection error');
        console.log('=========================');
        console.log(`${error}`);
        console.log('Process exited');
        process.exit();
    }
}

// function getGfsBucket() {
//     return gfsBucket;
// }

export { connectDatabase };

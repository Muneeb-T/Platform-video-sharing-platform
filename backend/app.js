// @ts-nocheck
import express from 'express';
import { config } from 'dotenv';
import { connectDatabase } from './config/database.js';
import errorHandler from './middlewares/error-handler.js';
import authRouter from './routes/auth-routes.js';
import videoRouter from './routes/video-routes.js';
import channelRouter from './routes/channel-routes.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { jwtStrategy, jwtAuthenticate } from './middlewares/jwt-auth.js';
import { facebookAuthStrategy } from './middlewares/facebook-auth.js';

config();
jwtStrategy();
facebookAuthStrategy();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(passport.initialize());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRouter);
app.use('/api/channel/', jwtAuthenticate, channelRouter);
app.use('/api/video/', videoRouter);

app.use(errorHandler);
app.listen(PORT, () => {
    connectDatabase();
    console.log('\nServer connected successfully');
    console.log('=============================');
    console.log(`Port Number      : ${PORT}`);
    console.log(`Node Environment : ${process.env.NODE_ENV}`);
});

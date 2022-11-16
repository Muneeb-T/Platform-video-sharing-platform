import { Strategy, ExtractJwt } from 'passport-jwt';
import userModel from '../models/user/user.js';
import passport from 'passport';
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    ignoreExpiration: true,
};

const jwtStrategy = () => {
    passport.use(
        new Strategy(opts, async (jwtPayload, done) => {
            try {
                const user = await userModel.findById(jwtPayload.id);
                if (user) {
                    user.tokenExpiry = jwtPayload?.exp;
                    return done(null, user);
                }
                return done(null, false);
            } catch (err) {
                return done(err, false, {
                    success: false,
                    message: err.message,
                });
            }
        })
    );
};

const jwtAuthenticate2 = (req, res, next) => {
    const token = req.header('authorization').split(' ')[0];
    if (token === 'Guest') return next();
    passport.authenticate('jwt', function (err, user) {
        if (err) return next(err);
        if (!user)
            return res.status(401).json({
                success: false,
                invalidToken: true,
                message:
                    'Authentication failed, Token expired or Invalid token',
            });
        req.user = user;
        next();
    })(req, res, next);
};

const jwtAuthenticate = (req, res, next) => {
    passport.authenticate('jwt', async function (err, user) {
        if (err) return next(err);
        if (!user)
            return res.status(401).json({
                success: false,
                message: 'Authentication failed, Invalid token',
            });
        const now = new Date();
        const refreshToken = req.cookies.refreshToken;
        const tokenExpiry = user.tokenExpiry;
        if (tokenExpiry > now.getTime()) {
            if (refreshToken !== user.refreshToken) {
                return res.status(401).json({
                    success: false,
                    message: 'Authentication failed, Invalid token',
                });
            }
            const { refreshToken: newRefreshToken } = user.generateJWT();
            await user.save();
            res.cookie('refreshToken', newRefreshToken, { httpOnly: true });
        }
        req.user = user;
        next();
    })(req, res, next);
};

export { jwtStrategy, jwtAuthenticate, jwtAuthenticate2 };

import { Strategy, ExtractJwt } from 'passport-jwt';
import userModel from '../models/channel/channel.js';
import passport from 'passport';
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = () => {
    passport.use(
        new Strategy(opts, async (jwt_payload, done) => {
            try {
                const user = await userModel.findById(jwt_payload.id);
                if (user) return done(null, user);
                return done(null, false);
            } catch (err) {
                return done(err, false, {
                    success: false,
                    message: 'Internal server error',
                });
            }
        })
    );
};

const jwtAuthenticate = (req, res, next) => {
    passport.authenticate('jwt', function (err, user, info) {
        if (err) return next(err);
        if (!user)
            return res
                .status(401)
                .json({ sucess: false, message: 'Unauthorized Access' });
        req.user = user;
        next();
    })(req, res, next);
};

export { jwtStrategy, jwtAuthenticate };

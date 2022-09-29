import { Strategy, ExtractJwt } from 'passport-jwt';
import userModel from '../models/user/user.js';
import passport from 'passport';
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    ignoreExpiration: false,
};

const jwtStrategy = () => {
    passport.use(
        new Strategy(opts, async (jwtPayload, done) => {
            try {
                const user = await userModel.findById(jwtPayload.id);
                if (user) return done(null, user);
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

const jwtAuthenticate = (req, res, next) => {
    passport.authenticate('jwt', function (err, user) {
        if (err) return next(err);
        if (!user)
            return res.status(401).json({
                success: false,
                message:
                    'Authentication failed, Token expired or Invalid token',
            });
        req.user = user;
        next();
    })(req, res, next);
};

export { jwtStrategy, jwtAuthenticate };

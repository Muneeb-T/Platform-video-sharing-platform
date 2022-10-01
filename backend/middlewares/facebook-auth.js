// @ts-nocheck
import { Strategy as FacebookStrategy } from 'passport-facebook';
import userModel from '../models/user/user.js';
import passport from 'passport';

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

const facebookAuthStrategy = () => {
    passport.use(
        new FacebookStrategy(
            {
                clientID: process.env.FACEBOOK_APP_ID,
                clientSecret: process.env.FACEBOOK_APP_SECRET,
                callbackURL: `${process.env.ROOT_URL}/api/auth/facebook-auth-callback`,
                passReqToCallback: true,
                profileFields: [
                    'id',
                    'name',
                    'birthday',
                    'email',
                    'gender',
                    'picture',
                ],
            },
            async function (req, accessToken, refreshToken, profile, done) {
                try {
                    const userData = profile._json;
                    console.log('\nFacebook authenitcation success');
                    console.log('================================');
                    console.log(userData);
                    const {
                        id,
                        username,
                        displayName,
                        first_name: firstName,
                        last_name: lastName,
                        name,
                        email,
                        gender,
                        birthday,
                        picture,
                    } = userData;
                    const user = await userModel.findOneAndUpdate(
                        {
                            $or: [
                                { 'email.address': email },
                                { 'googleAccount.email': email },
                                { 'facebookAccount.email': email },
                                { 'facebookAccount.id': id },
                            ],
                        },
                        {
                            'facebookAccount.username':
                                username ||
                                displayName ||
                                name ||
                                `${firstName} ${lastName}` ||
                                email.slice(0, email.indexOf('@')),
                            'facebookAccount.id': id,
                            'facebookAccount.email': email,
                            'facebookAccount.dateOfBirth': birthday,
                            'facebookAccount.gender': gender,
                            'facebookAccount.picture': picture.data.url,
                        },
                        {
                            new: true,
                            upsert: true,
                            runValidators: true,
                        }
                    );
                    if (!user.email.address) {
                        user.email.address = email;
                        user.email.verified = true;
                        await user.save();
                    }

                    return done(null, user);
                } catch (err) {
                    console.log('\nFacebook authentication error');
                    console.log('==============================');
                    console.log(err);
                    return done(err, null);
                }
            }
        )
    );
};

const facebookAuth = passport.authenticate('facebook', {
    scope: [
        'email',
        'user_birthday',
        'user_gender',
        'user_photos',
        'user_location',
        'user_hometown',
    ],
});

const facebookAuthCallback = passport.authenticate('facebook', {
    session: false,
    failureRedirect: '/api/auth/facebook-auth-failed',
    passReqToCallback: true,
});

export { facebookAuthStrategy, facebookAuth, facebookAuthCallback };

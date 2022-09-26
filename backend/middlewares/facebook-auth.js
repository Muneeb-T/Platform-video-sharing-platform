// @ts-nocheck
import { Strategy as FacebookStrategy } from 'passport-facebook';
import userModel from '../models/channel/channel.js';
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
                    const user = await userModel
                        .findOneAndUpdate(
                            {
                                $or: [
                                    { 'email.address' : email },
                                    { 'facebookAccount.email': email },
                                    { 'googleAccount.email': email },
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
                            }
                        )
                        .select({
                            username: 1,
                            email: 1,
                            phone: 1,
                            gender: 1,
                            country: 1,
                            dateOfBirth: 1,
                            googleAccount: 1,
                            facebookAccount: 1,
                            channelLogo: 1,
                        });
                    return done(null, {
                        token: user.generateJWT(),
                        user,
                    });
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
    failureRedirect: '/api/auth/facebook-auth-failed',
    session: false,
});

export { facebookAuthStrategy, facebookAuth, facebookAuthCallback };

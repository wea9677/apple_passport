require('dotenv').config();

const fs = require('fs');
const passport = require('passport');
const AppleStrategy = require('passport-apple').Strategy;
const user = require('../models');

module.exports = () =>{
    passport.use(
        new AppleStrategy(
            {
                clientID: "com.herokuapp.applepassport-web",
                teamID: "3L7RW74HCJ",
                callbackURL: "https://applepassport.herokuapp.com/apple/auth",
                keyID: "79KCA9TG7S",
                privateKeyLocation: "./config/AuthKey_79KCA9TG7S.p8",
                scope : "email, name"
            }, async (req, accessToken, refreshToken, idToken, profile, cb) => {
                console.log('apple profile :',
                                profile,
                                idToken,
                                'access',
                                accessToken

                );
                try {
                    const exUser = await user.findOne({
                        where: {userId : idToken, provider : 'apple'},
                    });

                    if(exUser) {
                        done(null, exUser);
                    } else {
                        const newUser = await user.create({
                            userId : idToken.sub,
                            email : idToken.email
                        });
                        done(null, newUser);
                    }
                } catch (error) {
                    console.error(error);
                    done(error);
                }
            },
        ),
    );
};
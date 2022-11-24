require('dotenv').config();
const path = require('path');
const fs = require('fs');
const passport = require('passport');
const AppleStrategy = require('passport-apple').Strategy;
const user = require('../models/user');

module.exports = () =>{
    passport.use(
        new AppleStrategy(
            {
                clientID: "com.herokuapp.applepassport-web",
                teamID: "3L7RW74HCJ",
                callbackURL: "https://applepassport.herokuapp.com/auth/apple",
                keyID: "79KCA9TG7S",
                privateKeyString:`-----BEGIN PRIVATE KEY-----
                MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQg35mh/XmWhr0PdUjt
                TJbTUpSJx86TNPIV5iiBKxrqxaCgCgYIKoZIzj0DAQehRANCAARt8pX8vdlVDIEN
                urRMdoq1WFktvGdRbBZQBRrLORIi8MCAD+GxnwUs8hCAsd44HX5s+lW9JwgmFPgN
                VSYP/Rbs
                -----END PRIVATE KEY-----`,

                privateKeyLocation: fs.readFileSync('./AuthKey_79KCA9TG7S.p8'),
                // privateKeyPath: path.join(__dirname, "./config/AuthKey_79KCA9TG7S.p8"),
                scope : "name email"
            }, async (req, accessToken, refreshToken, idToken, profile, cb) => {
                console.log('여기를 넘어가야 할거 같은데요')
                console.log('apple profile :',
                                profile,
                                idToken,
                                'access',
                                accessToken
                
                );
                console.log('여기까진 지나가나?')
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
require('dotenv').config();

const jwt = require('jsonwebtoken');
const passport = require('passport');
const user = require('../models/user');


//애플 로그인

const appleCallback = (req, res, next) =>{
    try {
        passport.authenticate(
            "apple",

            { failureRedirect: "/" },
            (err, user, info) =>{
                console.log("콜백 함수입니다.")
                if (err) return next(err);

                const {userId, email, userName} = user;

                const token = jwt.sign({userId}, process.env.MY_KEY, {
                    expiresIn:"24h",
                });

                result = {
                    userId,
                    email,
                    userName
                };
                res.send({user:result});
            }
        )(req, res, next);
    } catch (error) {
        res.status(400).send({errorMessage:"애플 로그인 실패"});
    }
};

async function checkMe(req, res) {
    const {userId, userName, email} = res.locals;
    try {
        res.send({
            success:true,
            userId,
            email,
            userName
        });
    } catch (error) {
        res.status(400).send({errorMessage: "로그인 인증실패"})
    }
};

module.exports = {
    appleCallback, checkMe
}
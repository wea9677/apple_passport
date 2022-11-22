require('dotenv').config();

const fs = require('fs');
const passport = require('passport');
const AppleStrategy = require('passport-apple').Strategy;
const {user} = require('../models');

module.exports = () =>{
    passport.use(
        new AppleStrategy(
            {
                clientID: "",
                teamID: "",
                callbackURL: "",
                keyID: "",
                privateKeyLocation: ""
            }
        )
    )
}
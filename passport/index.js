const passport = require('passport');
const apple = require('./apple');

module.exports = () => {
    passport.serializeUser((user, done) =>{
        console.log(user, '나오나요?')

        done(null, user);
    });

    passport.deserializeUser((user, done) =>{
        console.log('역직렬화', user);
        done(null, user);
    });


    apple();
}
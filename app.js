require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express;
const mongoose = require('mongoose');
const passport = require('passport');
const AppleStrategy = require('passport-apple');
const UserRouter = require('./routes/userRouter');
const port = process.env.PORT

app.get('/', (req, res)=>{
    res.send('<a href=\"/login\">Sign in with Apple</a>');
});


app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true}));


app.use('/auth', express.urlencoded({ extended: false}), UserRouter);


app.listen(port, ()=>{
    console.log(`${port}로 서버가 열렸습니다.`)
})






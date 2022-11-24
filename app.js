require('dotenv').config();
// const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const passportconfig = require('./passport');
const mongoose = require('mongoose');
// const passport = require('passport');
// const AppleStrategy = require('passport-apple');
const UserRouter = require('./routes/userRouter');
const port = process.env.PORT || 8080;


mongoose.connect('mongodb+srv://wea9677:tmxkdlfl@cluster0.xmzro.mongodb.net/applelogintest'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
passportconfig()
app.use(express.json());
// app.use(passport.initialize());
// app.use(passport.session());

// app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.status(200).render('index');
});

app.set("view engine", "ejs");
app.set("views", __dirname + "/view");

app.use('/auth', express.urlencoded({ extended: false}), UserRouter);


app.listen(port, ()=>{
    console.log(`${port}로 서버가 열렸습니다.`)
});






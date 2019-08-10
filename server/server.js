const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const {signup, login, addTopic, followTopic} = require('./controllers/userController');
const {signToken, checkToken} = require('./controllers/tokenController');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.post('/signup', signup, signToken, (req, res) => {
  res.status(200).json(res.locals.user);
});

app.post('/login', login, signToken, (req, res) => {
  res.status(200).json(res.locals.user);
});

app.post('/verifyAndLogin', checkToken, login, (req, res) => {
  res.status(200).json(res.locals.user);
});

app.post('/logout', (req, res) => {
  // find a way to do this without accessing the server
  // does the token cookie need to be httpOnly?
  res.clearCookie('token').send();
});

app.post('/addTopic', checkToken, addTopic, followTopic, (req, res) => {
  res.status(200).json(res.locals.user);
});

app.use((err, req, res, next) => {
  res.status(400).json({msg: err})
});

app.listen(3000);
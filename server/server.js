const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {signup, login} = require('./controllers/userController');
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

app.post('/verify', checkToken, (req, res) => {
  res.status(200).json(res.locals.token);
});

app.post('/logout', (req, res) => {
  res.clearCookie('token').send();
});

app.use((err, req, res, next) => {
  res.status(400).json({msg: err})
});

app.listen(3000);
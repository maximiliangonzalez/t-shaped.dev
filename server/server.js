const express = require('express');
const bodyParser = require('body-parser');
const {signup, login} = require('./controllers/userController');

const app = express();

app.use(bodyParser.json());

app.post('/signup', signup, (req, res) => {
  res.status(200).json(res.locals.user);
});

app.post('/login', login, (req, res) => {
  res.status(200).json(res.locals.user);
})

app.use((err, req, res, next) => {
  res.status(400).json({msg: err})
})

app.listen(3000);
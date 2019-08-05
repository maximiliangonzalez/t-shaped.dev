const {signup} = require('./controllers/userController');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/signup', signup, (req, res) => {
  res.status(200).json(res.locals.user);
});

app.use((err, req, res, next) => {
  res.status(400).json({msg: err})
})

// app.post('/login');

// app.post('/logout');

app.listen(3000);
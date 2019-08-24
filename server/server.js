const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

const topicRouter = require('./topicRouter');
const userRouter = require('./userRouter');

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/topic', topicRouter);
app.use('/user', userRouter);

app.use((err, req, res, next) => {
  res.status(400).json({msg: err})
});

app.listen(3000);
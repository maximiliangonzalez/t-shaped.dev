const router = require('express').Router();

const {signup, login} = require('./controllers/userController');
const {signToken, checkToken} = require('./controllers/tokenController');

router.post('/signup', signup, signToken, (req, res) => {
  res.status(200).json(res.locals.user);
});

router.post('/login', login, signToken, (req, res) => {
  res.status(200).json(res.locals.user);
});

router.post('/verifyAndLogin', checkToken, login, (req, res) => {
  res.status(200).json(res.locals.user);
});

router.post('/logout', (req, res) => {
  // find a way to do this without accessing the server
  // does the token cookie need to be httpOnly?
  res.clearCookie('token').send();
});

module.exports = router;
const jwt = require('jsonwebtoken');
const {secret} = require('../../config');
const {User} = require('../models/models');

module.exports = {
  checkToken(req, res, next) {
    let token = req.cookies.token;
    if (!token || !token.startsWith('Bearer')) {
      return next('Incorrect token format');
    }

    token = token.split(' ')[1];
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return next(err);
      }
      
      res.locals.token = decodedToken;
      User.findOne({name: res.locals.token.username}, (err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next('no user found');
        }
        res.locals.token.password = user.password
        return next();
      });
    });
  },

  signToken(req, res, next) {
    let token = jwt.sign({username: res.locals.user.name}, secret);
    res.cookie('token', `Bearer ${token}`);
    next();
  }
};
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
      
      User.findOne({name: decodedToken.username}, (err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next('no user found');
        }
        // we add the password to res.locals so the login() middleware can log a user in as usual if they have a valid token
        res.locals.token = decodedToken;
        res.locals.password = user.password
        return next();
      });
    });
  },

  signToken(req, res, next) {
    // we sign a jwt and send it back to the client as a cookie if a user successfully logs in or signs in
    let token = jwt.sign({username: res.locals.user.name}, secret);
    res.cookie('token', `Bearer ${token}`);
    next();
  }
};
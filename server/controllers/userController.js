const mongoose = require('mongoose');
const {User} = require('../models/models');

module.exports = {
  signup(req, res, next) {
    const {name, password} = req.body;
    User.create({name, password}, (err, user) => {
      if (err) {
        return next(err);
      }
      res.locals.user = user;
      return next();
    });
  }
};
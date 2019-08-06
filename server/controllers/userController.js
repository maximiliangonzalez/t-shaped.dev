const {User} = require('../models/models');

module.exports = {
  signup(req, res, next) {
    const {name, password} = req.body;
    User.findOne({name}, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        User.create({name, password}, (err, user) => {
          if (err) {
            return next(err);
          }
          res.locals.user = user;
          return next();
        });
      } else {
        return next('username not unique');
      }
    })
  },

  login(req, res, next) {
    const {name, password} = req.body;
    User.findOne({name}, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user || user.password !== password) {
        return next('incorrect credentials');
      }
      res.locals.user = user;
      return next();
    });
  }
};
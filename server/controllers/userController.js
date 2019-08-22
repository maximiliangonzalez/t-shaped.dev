const {User, Topic} = require('../models/models');

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
    let {name, password} = req.body;
    // login() is used as middleware in different locations
    // if there is a token property on res.locals, this means the previous middleware was checkToken()
    // this means that we're logging the user in automatically because they have a valid JWT
    // in that case, we want to take the information from the previous middleware rather than from the request body
    if (res.locals.token) {
      name = res.locals.token.username;
      password = res.locals.password;
    }

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
  },

  searchTopic(req, res, next) {
    // finds topics starting with the request parameter
    Topic.find({name: new RegExp(`^${req.params.topic}`, 'i')}, (err, topic) => {
      if (err) {
        return next(err);
      }
      res.locals.topics = topic? topic : [];
      return next();
    });
  },

  addTopic(req, res, next) {
    const {topicName, tags} = req.body;
    Topic.create({name: topicName, tags}, (err, topic) => {
      if (err) {
        return next('err');
      }
      if (!topic) {
        return next('nothing created');
      }
      res.locals.topic = topic;
      return next();
    });
  },

  followTopic(req, res, next) {
    if (req.body.topic && !res.locals.topic) {
      res.locals.topic = {_id: req.body.topic}
    }
    // user's following array is not being updated with new topic
    // split into findTopic middleware first? see if whole topic info is actually required
    User.findOneAndUpdate(
      {name: req.body.username},
      {$push: {following: res.locals.topic}},
      {new: true, useFindAndModify: false},
      (err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next('user not found');
        }
        return next();
    });
  },

  topicName(req, res, next) {
    Topic.findOne({_id: req.headers.id}, (err, topic) => {
      if (err) {
        return next(err);
      }
      if (!topic) {
        return next('no topic found');
      }
      res.locals.topic = topic.name;
      return next();
    })
  }
};
const { Topic } = require('../models/models');

module.exports = {

  searchTopic(req, res, next) {
    // finds topics starting with the request parameter
    Topic.find({name: new RegExp(`^${req.params.topic}`, 'i')}, (err, topic) => {
      console.log(err, topic);
      if (err) {
        return next(err);
      }
      res.locals.topics === topic ? topic : [];
      return next();
    });
  },

  addTopic(req, res, next) {
    if(res.locals.topics.length !== 0) return next('topic already exists');
    
    const { topic } = req.params;
    const { tags } = req.body;
    Topic.create({name: topic, tags}, (err, topic) => {
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

  findTopic(req, res, next) {
    Topic.findOne({_id: req.params.topic}, (err, topic) => {
      if (err) {
        return next(err);
      }
      if (!topic) {
        return next('topic not found');
      }
      res.locals.topic = topic;
      return next();
    });
  },

  followTopic(req, res, next) {
    User.findOneAndUpdate(
      {name: req.params.topic},
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
}
const router = require('express').Router();
const { searchTopic, addTopic, followTopic, topicName, findTopic} = require('./controllers/topicController');
const {signup, login} = require('./controllers/userController');
const { checkToken } = require('./controllers/tokenController');
router.get('/:topic', searchTopic, (req, res) => {
  res.status(200).json(res.locals.topics);
});

router.get('/topicName/:topic', topicName, (req, res) => {
  res.status(200).json(res.locals.topic);
});

router.post('/:topic', checkToken, addTopic, followTopic, (req, res) => {
  res.status(200).json(res.locals.topic._id);
});

router.post('/followTopic/:topic', checkToken, findTopic, followTopic, (req, res) => {
  res.status(200).json(res.locals.topic._id);
});



module.exports = router;
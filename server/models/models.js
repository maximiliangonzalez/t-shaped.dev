const mongoose = require('mongoose');
const {connection} = require('../../config');

mongoose.connect(connection)
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  following: {
    type: [
      {
        topic: {type: mongoose.Schema.ObjectId, ref: 'Topic'},
        confidence: Number
      }
    ],
    default: []
  }
});

const topicSchema = new mongoose.Schema({
  name: String,
  tags: [{
    type: String
  }],
  questions: {
    type: [
      {
        contributor: {type: mongoose.Schema.ObjectId, ref: 'User'},
        text: String,
        answers: {
          type: [
            {
              contributor: {type: mongoose.Schema.ObjectId, ref: 'User'},
              text: String,
              replies: {
                type: [
                  {
                    contributor: {type: mongoose.Schema.ObjectId, ref: 'User'},
                    text: String
                  }
                ],
                default: []
              }
            }
          ],
          default: []
        }
      }
    ],
    default: []
  }
});

module.exports = {
  Topic: mongoose.model('Topic', topicSchema),
  User: mongoose.model('User', userSchema)
};
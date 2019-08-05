const mongoose = require('mongoose');
const connection = require('../../config');

mongoose.connect(connection)
  .catch(err => {throw err});

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  following: {
    type: [
      {
        topic: String,
        confidence: Number
      }
    ],
    default: []
  }
});

const topicSchema = new mongoose.Schema({
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
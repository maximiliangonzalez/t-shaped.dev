A site for people in the interviewing process to track their comfort with questions they've been asked, so they can be more prepared if they come across a similar question. Allows groups to contribute and collaborate on their learning and growth.

To run, create a config.json file in the root directory with the following format:

module.exports = {
  connection: 'your mongo connection string here',
  secret: 'your jwt encryption secret here'
}
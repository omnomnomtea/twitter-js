const client = require('./db/index.js')

module.exports = {
  getUserID: function (userName) {
    console.log('get user id fired');
    let promise = client.query(`select id from users WHERE users.name = $1`, [userName]);
    return promise;
  },
  addUser: function (userName) {
    let promise = client.query(`INSERT INTO users (name) VALUES ($1) RETURNING id`, [userName]);
    return promise;
  },
  insertTweet: function (userId, tweetContent) {
    console.log('insertTweet fired');
    return client.query(`INSERT INTO tweets (user_id, content) VALUES ($1, $2) RETURNING id, user_id, content`, [userId, tweetContent]);
  },

  sendTweet: function (userName, result, io) {
    console.log(result);
    let tweet = { name: userName, content: result.rows[0].content, id: result.rows[0].id};
    io.sockets.emit('newTweet', tweet);
  },

  addTweet: function (userName, tweetContent, io, callbackNext) {
    console.log('add tweet fired');
    module.exports.getUserID(userName)
      .then(function (result) {
        if (result.rows.length) {
          return module.exports.insertTweet(result.rows[0].id, tweetContent)
        }
        else {
          return module.exports.addUser(userName).then(function (result) {
            return module.exports.insertTweet(result.rows[0].id, tweetContent);
          });
        }
      })
      .then(function (result) {
        module.exports.sendTweet(userName, result, io);
        callbackNext();

      })
      .catch(function (err){
        console.error(err);
      });
  }

}

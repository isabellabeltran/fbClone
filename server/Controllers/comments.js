const db = require('../db');


const saveComments = function (req, res) {
  const postContent = req.body;
  db.query('INSERT INTO comments (text_comment, id_post, id_author) VALUES (?, ?, ?)',
    [postContent.postText, postContent.idPost, postContent.authorId], function (err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
};

exports.saveComments = saveComments;
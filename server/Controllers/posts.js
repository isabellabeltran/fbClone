const db = require('../db');

const savePosts = function (req, res) {
  const postContent = req.body;
  db.query('INSERT INTO posts (post_text, id_author, id_wall) VALUES (?, ?, ?)',
    [postContent.postText, postContent.idAuthor, postContent.idWall],
    function (err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
};

const fetchPosts = function (req, res) {
  db.query('SELECT posts.id, post_text, posts.created_at, users.full_name, users.profile_picture FROM posts ' +
    'INNER JOIN users ON users.id = posts.id_author ' +
    'WHERE id_wall = ? ' +
    'ORDER BY posts.created_at DESC', [req.params.id], function (err, postData) {
    if (err) {
      res.send(err);
    } else {
      const postIds = postData.map(row => row.id);
      db.query('SELECT id_post, text_comment, comments.created_at, users.full_name, users.profile_picture FROM comments ' +
        'INNER JOIN users ON id_author = users.id ' +
        'WHERE id_post IN ? ORDER BY comments.created_at DESC',
      [[postIds]], function (err, commentData) {
        if (err) {
          res.send(err);
        } else {
          let comments = {};
          commentData.forEach(comment => {
            comments[comment.id_post] = comments[comment.id_post] || [];
            comments[comment.id_post].push({
              textComment: comment.text_comment,
              createdAt: comment.createdAt,
              author: comment.full_name,
              profilePic: comment.profile_picture
            });
          });
          res.send(
            postData.map(row => {
              return {
                id: row.id,
                postText: row.post_text,
                createdAt: row.created_at,
                author: row.full_name,
                profilePic: row.profile_picture,
                comments: comments[row.id] || []
              };
            })
          );
        }
      });
    }
  });
};

exports.fetchPosts = fetchPosts;
exports.savePosts = savePosts;
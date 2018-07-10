const con = require('../db');

const searchFriends = function(req, res) {
  const id = req.query.id;
  const term = req.query.term;
  if (term.length) { // old 'SELECT * FROM `users` WHERE `full_name` LIKE ? OR `username` LIKE ?', ['%'+term+'%', '%'+term+'%']
    con.query('SELECT `username`, `full_name`, `profile_picture`, `treats`, users.`id` ' +
              ', IF(uf.`id` IS NULL, \'0\', \'1\') AS `is_my_friend` FROM `users` LEFT JOIN `user_friends` `uf` ON ' +
              'uf.`id_one`=users.`id` AND uf.`id_two`=? WHERE (`full_name` LIKE ? OR `username` LIKE ?) ' +
              'ORDER BY `is_my_friend` DESC', [id, '%' + term + '%', '%' + term + '%' ], function(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  } else {
    res.send('');
  }
};

const getFriends = function(req, res) {
  const userId = req.params.id;
  con.query('SELECT `username`, `full_name`, `profile_picture`, users.`id` ' +
    'FROM `users` INNER JOIN `user_friends` `uf` ON ' +
    'uf.`id_one`=users.`id` WHERE uf.`id_two`=?', [userId], function(err, data) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
};

const toggleFriend = function(req, res) {
  const potentialFriendId = req.body.potentialFriendId;
  const id = req.body.id;
  const button = req.body.button;
  con.query('SELECT `id_one`, `id_two` FROM `user_friends` WHERE id_one=? AND id_two=?', [potentialFriendId, id], (err, searchData) => {
    if (err) { res.send(err); } else {
      if (searchData.length === 0) { // later change this logic to be a pending friend request
        if (button === 'Add Friend') {
          con.query('INSERT INTO `user_friends` (`id_one`, `id_two`) VALUES (?, ?), (?, ?)', [potentialFriendId, id, id, potentialFriendId], (err, insertData) => {
            if (err) { res.send(err); } else {
              res.send('added');
            }
          });
        } else {
          res.send('wait');
        }
      } else {
        if (button === 'Remove Friend') {
          con.query('DELETE FROM `user_friends` WHERE (`id_one`=? AND `id_two`=?) OR (`id_one`=? AND `id_two`=?)', [potentialFriendId, id, id, potentialFriendId], (err, deleteData) => {
            if (err) { res.send(err); } else {
              res.send('deleted');
            }
          });
        } else {
          res.send('wait');
        }
      }
    }
  });
};

exports.searchFriends = searchFriends;
exports.toggleFriend = toggleFriend;
exports.getFriends = getFriends;
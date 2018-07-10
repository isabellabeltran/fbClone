const DB = require('../DB');

const PersonalInfoController = {
  GetProfileInformation: (req, res) => {
    DB.query('SELECT * from users WHERE id=?', [req.params.id], (err, data) => {
      if (err) { 
        console.log('Error from personalInfo', err); 
        res.send(err)
      }
      res.status(200).send({
        username: data[0].username, 
        profilePic: data[0].profile_picture,
        join: data[0].created_at,
        treats: data[0].treats,
        status: data[0].status
      });
    });
  },
  SaveUpdatedProfile: (req, res) => {
    DB.query('UPDATE users SET treats = ? , status = ? WHERE id = ?', 
      [req.body.treats, req.body.status, req.body.id], (err, data) => {
        if (err) { 
          console.log('Error from personalInfoController', err); 
          res.send(err);
        }
        res.status(200).send('Succes');
      }); 
  }
};

module.exports = PersonalInfoController; 

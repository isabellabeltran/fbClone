require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const router = require('./routes/index.js');
const path = require('path');
const PORT = process.env.PORT;

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
  secret: 'super secret stuff',
  maxAge: 8640000000
}));
app.use(express.static(__dirname + '/../client/public'));
app.use('/', router);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});

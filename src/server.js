import path from 'path';
import express from 'express';
import request from 'superagent';
import bodyParser from 'body-parser';

import config from '../config';

const app = express();
const { FIREBASE: { SERVER_KEY } } = config;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/firebase-messaging-sw.js', express.static(path.join(__dirname, '../', 'firebase-messaging-sw.js')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './html', 'index.html'));
});

/*
  {
    "to":"/topics/all",
    "notification":{
      "body":"Yellow"
    }
  }
*/

app.post('/notif', (req, res) => {
  request.post('https://fcm.googleapis.com/fcm/send')
    .set({
      'Content-Type': 'application/json',
      'Authorization': 'key=' + SERVER_KEY,
    })
    .send(req.body)
    .end(function(err, results){
      if (err) {
        res.status(500).send(err);
      }

      res.status(200).json(results);
    });
});

app.post('/topic-subscription', (req, res) => {
  console.log(req.body);
  if (typeof req.body.token !== 'undefined' && typeof req.body.topic !== 'undefined') {
    request.post(`https://iid.googleapis.com/iid/v1/${req.body.token}/rel/topics/${req.body.topic}`)
      .set({
        'Content-Type': 'application/json',
        'Authorization': 'key=' + SERVER_KEY,
      })
      .end(function(err, results){
        if (err) {
          res.status(500).send(err);
        }

        res.status(200).json(results);
      });
  }
});

app.listen(3000, '0.0.0.0', () => {
  console.log('App is listening on port 3000');
});
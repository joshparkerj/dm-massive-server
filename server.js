/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const massive = require('massive');

const postgresUrl = require('./postgres-url.json');
const port = require('./port.json');

module.exports = function server() {
  const app = express();
  let listeningServer;

  return {
    start: () => {
      app.use(bodyParser.json());
      app.use(cors());

      massive(postgresUrl)
        .then((db) => {
          app.set('db', db);
          console.log('database is connected');
        })
        .catch((err) => {
          console.error(err);
          console.log('database connection error');
        });

      app.post('/add', (req, res) => {
        const { username, email } = req.body;
        console.log(username);
        console.log(email);
        const db = req.app.get('db');

        db.insert_data([username, email])
          .then(() => {
            res.send('saved data successfully');
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      });

      app.get('/get-data', (req, res) => {
        const db = req.app.get('db');

        db.get_all()
          .then((data) => {
            console.log(data);
            res.send(data);
          })
          .catch(() => {
            res.status(500).send();
          });
      });

      listeningServer = app.listen(port, () => {
        console.log(`server is running on port ${port}`);
      });
    },

    stop: () => {
      listeningServer.close();
    },
  };
};

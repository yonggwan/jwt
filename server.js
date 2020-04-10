const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const port = process.env.port || 3000;

const JWT_SECRET = fs.readFileSync('./secret.key', { encoding: 'utf-8' }).toString();

class AppServer {
  constructor () {
    this.app = express();
  }

  setRoutes () {
    this.app.get('/', (req, res) => res.send('Hello World!'));
    this.app.get('/redirect', (req, res) => res.redirect('/login'));

    this.app.get('/login', (req, res) => {
      const payload = {
        id: req.query.id
      };
      console.log({
        JWT_SECRET,
        payload
      })
      jwt.sign(payload, JWT_SECRET, (err, encoded) => {
        if (err) {
          res.status(500).send(err.message);
        }
        res.send(`encoded: ${encoded}`);
      });
    });
  }

  start () {
    this.app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
  }
}

const app = new AppServer();

app.setRoutes();
app.start();

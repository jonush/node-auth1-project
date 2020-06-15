const bcryptjs = require('bcryptjs');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

const Users = require('../users/usersModel');
const secrets = require('../config/secret');

router.post('/register', (req,res) => {
  const { username, password } = req.body;
  const rounds = process.env.HAS_ROUNDS || 8;
  const hash = bcryptjs.hashSync(password, rounds);

  Users.add({ username, password: hash })
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.send(err))
});

router.post('/login', (req,res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .then(([user]) => {
      if(user && bcryptjs.compareSync(password, user.password)) {
        req.session.user = { id: user.id, username: user.username };
        const token = createToken(user);
        res.status(200).json({ message: `Login successful, welcome ${user.username}`, session: req.session.user, token });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.get('/logout', (req, res) => {
  if(req.session) {
    req.session.destroy(err => {
      if(err) {
        res.status(500).json({ message: "Could not log out, please try again" });
      } else {
        res.status(204).end();
      }
    });
  } else {
    res.status(204).end();
  }
});

function createToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
};

module.exports = router;
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const withAuth = require('../middleware/authentication');
const router = express.Router();

const { AUTH_SECRET } = process.env;

router.post('/register', (req, res) => {
  const model = mongoose.model('User');
  const { name, email, password } = req.body;
  if (!name) return res.status(400).send('Missing user\'s name');
  if (!email) return res.status(400).send('Missing user\'s email');
  if (!password) return res.status(400).send('Missing user\'s password');
  const _id = new mongoose.Types.ObjectId();
  const user = new model({ _id, name, email, password });
  user.save(function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send('Error adding new user');
    }
    res.status(200).send(`New user ${name} added successfully`);
  });
});

router.post('/auth', (req, res) => {
  const { email, password } = req.body;
  const model = mongoose.model('User');
  model.findOne({ email }, function (err, user) {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(401).send('Incorrect email or password');
    user.isCorrectPassword(password, function (err, same) {
      if (err) return res.status(500).send(err);
      if (!same) return res.status(401).send('Incorrect email or password');
      const payload = { email };
      const token = jwt.sign(payload, AUTH_SECRET, {
        expiresIn: '1h'
      });
      res.cookie('token', token, { httpOnly: true }).sendStatus(200);
    });
  });
});

router.get('/auth', withAuth, (req, res) => {
  res.sendStatus(200);
});

module.exports = router;

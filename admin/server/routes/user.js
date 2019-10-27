const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const withAuth = require('../middleware/authentication');
const router = express.Router();

const secret = process.env.SECRET;

router.post('/register', (req, res) => {
  const model = mongoose.model('User');
  if (!req.body.name || req.body.name === '') return res.status(404).send('Missing user name');
  if (!req.body.email || req.body.email === '') return res.status(404).send('Missing user email');
  if (!req.body.password || req.body.password === '') return res.status(404).send('Missing user password');
  const { name, email, password } = req.body;
  const user = new model({ name, email, password });
  user.save(function (err) {
    if (err) return res.status(500).send('Error adding new user');
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
      if (!user) return res.status(401).send('Incorrect email or password');
      const payload = { email };
      const token = jwt.sign(payload, secret, {
        expiresIn: '1h'
      });
      res.cookie('token', token, { httpOnly: true }).sendStatus(200);
    });
  });
});

router.get('/auth', withAuth, (req, res) => {
  res.sendStatus(200);
})

module.exports = router

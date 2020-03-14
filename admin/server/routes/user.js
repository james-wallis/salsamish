const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const withAuth = require('../middleware/authentication');
const router = express.Router();

const secret = process.env.AUTH_SECRET;

router.post('/register', (req, res) => {
  const model = mongoose.model('User');
  if (!req.body.name || req.body.name === '') return res.status(400).send('Missing user\'s name');
  if (!req.body.email || req.body.email === '') return res.status(400).send('Missing user\'s email');
  if (!req.body.password || req.body.password === '') return res.status(400).send('Missing user\'s password');
  const { name, email, password } = req.body;
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
  console.log('secret', secret);
  console.log(email, password);
  const model = mongoose.model('User');
  model.findOne({ email }, function (err, user) {
    console.log('user', user);
    
    if (err) return res.status(500).send(err);
    if (!user) return res.status(401).send('Incorrect email or password');
    user.isCorrectPassword(password, function (err, same) {
      console.log('same', same);
      
      if (err) return res.status(500).send(err);
      if (!same) return res.status(401).send('Incorrect email or password');
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

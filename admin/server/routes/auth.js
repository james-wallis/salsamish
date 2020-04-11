const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const withAuth = require('../middleware/authentication');
const router = express.Router();

const { AUTH_SECRET } = process.env;

router.post('/', async(req, res) => {
  const { email, password } = req.body;
  const model = mongoose.model('User');
  try {
    const user = await model.findOne({ email });
    if (!user) return res.status(401).send('Incorrect email or password');
    user.isCorrectPassword(password, function (err, same) {
      if (err) return res.status(500).send(err);
      if (!same) return res.status(401).send('Incorrect email or password');
      const { name } = user;
      const payload = { name, email };
      const token = jwt.sign(payload, AUTH_SECRET, {
        expiresIn: '1h'
      });
      res.cookie('token', token, { httpOnly: true }).sendStatus(200);
    });
  } catch(err) {
    res.status(500).send(err);
  }
});

router.get('/', withAuth, (req, res) => {
  const { name, email } = req.user;
  res.status(200).send({ name, email });
});

module.exports = router;
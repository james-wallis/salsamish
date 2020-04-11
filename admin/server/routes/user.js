const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

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

router.put('/password', async(req, res) => {
  const model = mongoose.model('User');
  const { name, email } = req.user;
  const { password } = req.body;
  if (!password) return res.status(400).send('Requires a password in req.body');
  try {
    const user = await model.findOne({ name, email });
    user.password = password;
    user.save(function (err) {
      console.log(err);
      
      res.status(200).send('password updated');
    });
    // await model.updateOne({ name, email }, updatedUser);
    
  } catch(err) {
    res.status(500).send(err);
  }
});

router.get('/me', (req, res) => {
  const { name, email } = req.user;
  if (!name || !email) {
    console.log('unidentified user in the system');
    return res.sendStatus(500);
  }
  res.status(200).send({ name, email });
})

module.exports = router;

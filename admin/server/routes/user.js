const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const withAuth = require('../middleware/authentication');
const { usePasswordHashToMakeToken, decodeUserIDFromToken, getPasswordResetURL, sendResetPasswordEmail } = require('../modules/utils');

router.post('/register', withAuth, (req, res) => {
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

router.put('/password', withAuth, async(req, res) => {
    const model = mongoose.model('User');
    const { name, email } = req.user;
    const { password } = req.body;
    if (!password) return res.status(400).send('Requires a password in req.body');
    try {
        const user = await model.findOne({ name, email });
        user.password = password;
        await user.save();
        res.status(200).send('password updated');
    } catch(err) {
        res.status(500).send(err);
    }
});

router.get('/me', withAuth, (req, res) => {
    const { name, email } = req.user;
    if (!name || !email) {
        console.log('unidentified user in the system');
        return res.sendStatus(500);
    }
    res.status(200).send({ name, email });
});

router.post('/reset-password', async(req, res) => {
    const model = mongoose.model('User');
    const { email } = req.body;
    try {
        const user = await model.findOne({ email });
        if (!user) return res.status(404).send('invalid user');

        const token = usePasswordHashToMakeToken(user);
        const url = getPasswordResetURL(user, token);
        const info = await sendResetPasswordEmail(user, url);
        console.log('Reset password email sent', info.response);
        res.sendStatus(200);
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
});

router.post('/reset-password/:id/:token', async (req, res) => {
    const model = mongoose.model('User');
    const { id: userID, token } = req.params;
    const { password } = req.body;
    try {
        const user = await model.findOne({ _id: userID });
        if (!user) return res.status(404).send('invalid user');

        const { userID: decodedUserID } = decodeUserIDFromToken(user, token);
        // If the request userID matches the decrypted userID then update the password
        if (decodedUserID !== userID) return res.status(404).send('invalid user');
        user.password = password;
        await user.save();
        res.status(200).send('password updated');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

module.exports = router;

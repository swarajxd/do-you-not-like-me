const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/click', async (req, res) => {
    const { name } = req.body;
    try {
        let user = await User.findOne({ name });
        if (!user) {
            user = new User({ name, clickCount: 0 });
        }
        user.clickCount += 1;
        await user.save();
        res.status(200).send('Click recorded');
    } catch (error) {
        res.status(500).send('Server error');
    }
});

module.exports = router;

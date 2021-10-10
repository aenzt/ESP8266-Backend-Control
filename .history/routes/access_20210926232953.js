const express = require('express');
const router = express.Router();
const User = require('../models/Access');

router.get('/', async (req, res) => {
    const access = await User.find();
    res.json(access);
});

// Create new quote
router.post('/new', async (req, res) => {
	const newUser = new User(req.body);
	
	const savedUser = await newUser.save();

	res.json(savedUser);
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Access = require('../models/Access');

router.get('/', async (req, res) => {
    const access = await Access.find();
    res.json(access);
});

// Create new quote
router.post('/new', async (req, res) => {
	const newUser = new Access(req.body);
	
	const savedUser = await newUser.save();

	res.json(savedUser);
});

module.exports = router;
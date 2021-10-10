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
	let dateTime = {
        "entryTime": new Date(1970,1,1),
        "exitTime": new Date(1970,1,1)
    }
    let final = { ...newUser, ...dateTime}
	const savedUser = await final.save();

	res.json(savedUser);
});

router.get('/get/:uid', async (req, res) => {
    const q = await User.findOne({"uid":req.params.uid});
    res.json(q);
})

router.get('/access/:uid', async (req, res) => {
    const u = await User.countDocuments({"uid":req.params.uid})
    res.json({"count":u});
})

module.exports = router;
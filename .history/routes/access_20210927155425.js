const express = require('express');
const router = express.Router();
const User = require('../models/Access');

router.get('/', async (req, res) => {
    const access = await User.find();
    res.json(access);
});

// Create new quote
router.post('/register', async (req, res) => {
	const newUser = new User(req.body);
    defaultTime = new Date(1970,1,1);
	let dateTime = {
        "entryTime": defaultTime,
        "exitTime": defaultTime
    };
    Object.assign(newUser, dateTime);
	const savedUser = await newUser.save();
	res.json(savedUser);
});

router.get('/get/:uid', async (req, res) => {
    const q = await User.findOne({"uid":req.params.uid});
    res.json(q);
})

router.get('/check/:uid', async (req, res) => {
    const u = await User.countDocuments({"uid":req.params.uid})
    if (u == 1) {
        res.json({"status":true}); 
    }else {
        res.json({"status":false});
    }
})

module.exports = router;
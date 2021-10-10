const express = require('express');
const router = express.Router();
const Access = require('../models/Access');

router.get('/', async (req, res) => {
    const access = await Access.find();
    res.json(access);
});
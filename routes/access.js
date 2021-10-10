const express = require('express');
const router = express.Router();
const User = require('../models/Access');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: '*'
}));
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        allowedHeaders: ["Origin"]
    }
});

router.get('/', async (req, res) => {
    const access = await User.find();
    const changeStream = User.watch().on('change', (change) => {
        switch (change.operationType) {
            case "insert":
                User.find(function (err, docs) {
                    if (!err){
                        //gitu dah
                    }
                });
            case "update":
                User.find(function (err, docs) {
                    if (!err){
                        //gitu dah
                    }
                });
        }
    });
    io.emit('update', access);
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
});

router.post('/update/:uid', async (req, res) => {
    var date = new Date;
    let dateTime = {
        "entryTime": date
    };
    const doc = await User.findOneAndUpdate({"uid":req.params.uid}, dateTime, {
        new: true
    });
    io.emit('update', doc);
    res.status(200).send();
});

router.get('/check/:uid', async (req, res) => {
    const u = await User.countDocuments({"uid":req.params.uid})
    if (u == 1) {
        res.json({"status":true}); 
    }else {
        res.json({"status":false});
    }
});

io.on('connection', () => {
    console.log('a user is connected')
});

module.exports = router;
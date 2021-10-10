require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const cors = require('cors');
const http = require('http').Server(app);

app.use(cors({
    origin: '*'
}));
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        allowedHeaders: ["Origin"]
    }
});

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology:true})
const db = mongoose.connection
db.once('open', () => console.log('Connected to db'))

const User = require('./models/Access');
app.use(express.json())

app.get('/', async (req, res) => {
    const access = await User.find();
    io.emit('update', access);
    res.json(access);
})

app.post('/register', async (req, res) => {
	const newUser = new User(req.body);
    defaultTime = new Date(1970,1,1);
	let dateTime = {
        "entryTime": defaultTime,
        "exitTime": defaultTime
    };
    Object.assign(newUser, dateTime);
	const savedUser = await newUser.save();
    User.find(function (err, docs) {
        if (!err){
            io.emit('update', docs);
        }
    })
	res.json(savedUser);
});

app.get('/get/:uid', async (req, res) => {
    const q = await User.findOne({"uid":req.params.uid});
    res.json(q);
});

app.post('/update/:uid', async (req, res) => {
    const q = await User.findOne({"uid":req.params.uid});
    var date = new Date;
    if (q.presence == false){
        let dateTime = {
            "entryTime": date,
            "presence": true
        };
        const doc = await User.findOneAndUpdate({"uid":req.params.uid}, dateTime, {
            new: true
        });
    } else{
        let dateTime = {
            "exitTime": date,
            "presence": false
        };
        const doc = await User.findOneAndUpdate({"uid":req.params.uid}, dateTime, {
            new: true
        });
    }
    User.find(function (err, docs) {
        if (!err){
            io.emit('update', docs);
        }
    })
    res.status(200).send();
});

app.get('/check/:uid', async (req, res) => {
    const u = await User.countDocuments({"uid":req.params.uid})
    if (u == 1) {
        res.json({"status":true}); 
    }else {
        res.json({"status":false});
    }
});

io.on('connection', () => {
    User.find(function (err, docs) {
        if (!err){
            io.emit('update', docs);
        }
    })
});

User.watch().on('change', (change) => {
    switch (change.operationType) { 
        case "insert":
            User.find(function (err, docs) {
                if (!err){
                    io.emit('update', docs)
                }
            });
        case "update":
            User.find(function (err, docs) {
                if (!err){
                    io.emit('update', docs)
                }
            });
        case "delete":
            User.find(function (err, docs) {
                if (!err){
                    io.emit('update', docs)
                }
            });
    }
});

var server = http.listen(port, () => {
    console.log(`server is running on`, server.address().port)
})
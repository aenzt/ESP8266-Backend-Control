require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
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

mongoose.connect("mongodb+srv://aenzt:katasandibaru321@cluster0.gichf.mongodb.net/MyDay?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology:true})
const db = mongoose.connection
db.once('open', () => console.log('Connected to db'))

const User = require('./models/Access');
app.use(express.json())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

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
    let uid = req.params.uid
    let q = await User.findOne({"uid":uid});
    console.log(req.body);
    var date = new Date;
    let doc;
    if (q.presence == false){
        let dateTime = {
            "entryTime": date,
            "presence": true,
            "latestTemp": req.body.latestTemp
        };
        doc = await User.findOneAndUpdate({"uid":uid}, dateTime, {
            new: true
        });
    } else{
        let dateTime = {
            "exitTime": date,
            "presence": false,
            "latestTemp": req.body.latestTemp
        };
        doc = await User.findOneAndUpdate({"uid":uid}, dateTime, {
            new: true
        });
    }
    User.find(function (err, docs) {
        if (!err){
            io.emit('update', docs);
        }
    })
    q = await User.findOne({"uid":req.body.UUID});
    res.send(q);
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
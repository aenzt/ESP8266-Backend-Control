const { Double } = require('mongodb');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: String,
	uid: String,
    kelas: Number,
    vacStat1: Boolean,
    vacStat2: Boolean,
    presence: Boolean,
    latestTemp: Number,
    entryTime: Date,
    exitTime: Date
});

module.exports = mongoose.model('User', UserSchema);
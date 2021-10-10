const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: String,
	uid: String,
    kelas: Number,
    vacStat: String
});

module.exports = mongoose.model('User', UserSchema);
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: String,
	uid: String,
    vacStat: String
});

module.exports = mongoose.model('User', AccessSchema);
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: String,
	uid: String,
    kelas: Int16Array,
    vacStat: String
});

module.exports = mongoose.model('User', UserSchema);
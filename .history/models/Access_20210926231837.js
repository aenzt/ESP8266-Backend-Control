const mongoose = require('mongoose');

const AccessSchema = new mongoose.Schema({
	name: String,
	uid: String
});

module.exports = mongoose.model('Quote', QuoteSchema);
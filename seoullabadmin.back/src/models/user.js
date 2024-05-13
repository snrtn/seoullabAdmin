const mongoose = require('mongoose');
const { loginConn } = require('../config/database');

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true, index: true },
	password: { type: String, required: true },
});

const User = loginConn.model('User', userSchema, 'identity');

module.exports = User;

const mongoose = require('mongoose');
require('dotenv').config();

const loginConn = mongoose.createConnection(process.env.MONGO_URI_LOGIN);
const menuConn = mongoose.createConnection(process.env.MONGO_URI_MENUS);

loginConn.on('connected', () => {
	console.log('Successfully connected to Login MongoDB.');
});
loginConn.on('error', (err) => {
	console.error('Failed to connect to Login MongoDB:', err);
});

menuConn.on('connected', () => {
	console.log('Successfully connected to Menus MongoDB.');
});
menuConn.on('error', (err) => {
	console.error('Failed to connect to Menus MongoDB:', err);
});

exports.loginConn = loginConn;
exports.menuConn = menuConn;

const express = require('express');
const jwt = require('jsonwebtoken');
const authenticateUser = require('../middleware/authenticateUser');
const validateRequest = require('../middleware/validateRequest');
const rateLimiter = require('../middleware/rateLimiter');
const User = require('../models/user');
const router = express.Router();

const generateToken = (userId) => {
	return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

router.post('/login', rateLimiter, validateRequest, authenticateUser, (req, res) => {
	const { username } = req.body;
	if (!username) {
		return res.status(400).json({ success: false, message: 'Username must not be empty' });
	}
	User.findOne({ username })
		.maxTimeMS(20000)
		.then((user) => {
			if (!user) {
				return res.status(404).json({ success: false, message: 'User not found' });
			}
			const token = generateToken(user._id);
			res.json({ success: true, message: 'Logged in successfully', token });
		})
		.catch((error) => {
			console.error('Authentication Error:', error);
			res.status(500).json({ success: false, message: 'Authentication failed.', error: error.toString() });
		});
});

router.post('/logout', async (req, res) => {
	const { token } = req.body;
	if (!token) {
		return res.status(400).json({ success: false, message: 'Token is required for logout' });
	}

	try {
		jwt.verify(token, process.env.JWT_SECRET);
		res.json({ success: true, message: 'Successfully logged out' });
	} catch (error) {
		console.error('Logout Error:', error);
		res.status(500).json({ success: false, message: 'Logout failed', error: error.toString() });
	}
});

module.exports = router;

const express = require('express');
const jwt = require('jsonwebtoken');
const authenticateUser = require('../middleware/authenticateUser');
const validateRequest = require('../middleware/validateRequest');
const rateLimiter = require('../middleware/rateLimiter');
const User = require('../models/user');

const router = express.Router();

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
			const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
			res.json({ success: true, message: 'Logged in successfully', token });
		})
		.catch((error) => {
			console.error('Authentication Error:', error);
			res.status(500).json({ success: false, message: 'Authentication failed.', error: error.toString() });
		});
});

module.exports = router;

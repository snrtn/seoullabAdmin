const bcrypt = require('bcrypt');
const User = require('../models/user');

async function authenticateUser(req, res, next) {
	const { username, password } = req.body;
	try {
		const user = await User.findOne({ username });
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ success: false, message: 'Invalid username or password' });
		}
		req.user = user;
		next();
	} catch (error) {
		console.error('Authentication Error:', error);
		res.status(500).json({ success: false, message: 'Server error during authentication', error: error.toString() });
	}
}

module.exports = authenticateUser;

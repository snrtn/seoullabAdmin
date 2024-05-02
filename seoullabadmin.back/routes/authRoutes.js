const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
	const { username, password } = req.body;
	if (username === 'admin' && password === 'password123') {
		res.json({ success: true, message: '로그인 성공!' });
	} else {
		res.status(401).json({ success: false, message: '로그인 실패' });
	}
});

module.exports = router;

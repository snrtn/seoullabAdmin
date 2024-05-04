const app = require('./app');
const PORT = process.env.PORT || 3000;

app.use((err, req, res, next) => {
	if (err.code !== 'EBADCSRFTOKEN') return next(err);
	res.status(403).send('Invalid CSRF token');
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const helmet = require('helmet');
// const { body, validationResult } = require('express-validator');

// require('dotenv').config();

// const saltRounds = 10; // bcrypt를 위한 salt 생성 라운드 수

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(helmet()); // 보안 헤더 추가

// mongoose
// 	.connect(process.env.MONGO_URI_LOGIN, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	})
// 	.then(() => console.log('MongoDB connected...'))
// 	.catch((err) => console.error('MongoDB connection error:', err));

// const userSchema = new mongoose.Schema({
// 	username: { type: String, required: true, unique: true },
// 	password: { type: String, required: true },
// });

// const User = mongoose.model('User', userSchema, 'identity');

// app.post(
// 	'/login',
// 	[
// 		body('username').trim().isLength({ min: 1 }).withMessage('Username cannot be empty'),
// 		body('password').trim().isLength({ min: 1 }).withMessage('Password cannot be empty'),
// 	],
// 	async (req, res) => {
// 		const errors = validationResult(req);
// 		if (!errors.isEmpty()) {
// 			return res.status(400).json({ errors: errors.array() });
// 		}

// 		const { username, password } = req.body;

// 		try {
// 			const existingUser = await User.findOne({ username });
// 			if (existingUser) {
// 				return res.status(409).json({ error: 'Username already exists' });
// 			}

// 			const hashedPassword = await bcrypt.hash(password, saltRounds);
// 			const newUser = new User({ username, password: hashedPassword });
// 			await newUser.save();

// 			const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

// 			res.status(201).json({ message: 'User registered', token });
// 		} catch (error) {
// 			console.error(error);
// 			res.status(500).json({ error: 'Server error' });
// 		}
// 	},
// );

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
// 	console.log(`Server running on http://localhost:${PORT}`);
// });

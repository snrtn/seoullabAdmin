const { body, validationResult } = require('express-validator');

const invalidValues = ['none', 'undefined', 'null'];

const validateRequest = [
	body('username')
		.trim()
		.notEmpty()
		.withMessage('Username must not be empty')
		.custom((value) => value !== undefined && value !== null && !invalidValues.includes(value.toLowerCase()))
		.withMessage('Invalid username value'),
	body('password')
		.trim()
		.notEmpty()
		.withMessage('Password must not be empty')
		.custom((value) => value !== undefined && value !== null && !invalidValues.includes(value.toLowerCase()))
		.withMessage('Invalid password value'),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];

module.exports = validateRequest;

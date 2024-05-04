const express = require('express');
const { Dessert, Drink, Main, Starter } = require('../models/menu');

const router = express.Router();

router.post('/register-menu', async (req, res) => {
	try {
		let newMenu;
		const { category, name, description, price } = req.body;

		switch (category) {
			case 'dessert':
				newMenu = new Dessert({ name, description, price });
				break;
			case 'drink':
				newMenu = new Drink({ name, description, price });
				break;
			case 'main':
				newMenu = new Main({ name, description, price });
				break;
			case 'starter':
				newMenu = new Starter({ name, description, price });
				break;
			default:
				return res.status(400).json({ success: false, message: 'Invalid menu category.' });
		}

		await newMenu.save();
		res.status(201).json({ success: true, message: 'The menu has been successfully registered.', data: newMenu });
	} catch (error) {
		console.error('Error in register-menu:', error);
		res.status(500).json({
			success: false,
			message: 'Failed to register the menu. Please try again.',
			error: error.toString(),
		});
	}
});

module.exports = router;

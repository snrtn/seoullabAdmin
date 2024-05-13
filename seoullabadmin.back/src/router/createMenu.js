const express = require('express');
const { Dessert, Drink, Main, Starter } = require('../models/menu');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.post('/seoullab', authenticateToken, async (req, res) => {
	try {
		let newMenu;
		const { primaryCategory, secondaryCategory, name, description, price } = req.body;

		switch (primaryCategory) {
			case 'desserts':
				newMenu = new Dessert({ primaryCategory, secondaryCategory, name, description, price });
				break;
			case 'drinks':
				newMenu = new Drink({ primaryCategory, secondaryCategory, name, description, price });
				break;
			case 'mains':
				newMenu = new Main({ primaryCategory, secondaryCategory, name, description, price });
				break;
			case 'starters':
				newMenu = new Starter({ primaryCategory, secondaryCategory, name, description, price });
				break;
			default:
				return res.status(400).json({ success: false, message: 'Invalid menu category.' });
		}

		await newMenu.save();
		res.status(201).json({ success: true, message: 'The menu has been successfully registered.', data: newMenu });
	} catch (error) {
		console.error('Error in seoullab:', error);
		res.status(500).json({
			success: false,
			message: 'Failed to register the menu. Please try again.',
			error: error.toString(),
		});
	}
});

module.exports = router;

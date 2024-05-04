const express = require('express');
const router = express.Router();
const { Dessert, Drink, Main, Starter } = require('../models/menu');

router.get('/api/seoullab', async (req, res) => {
	try {
		const starters = await Starter.find({ category: 'starter' });
		const mains = await Main.find({ category: 'main' });
		const desserts = await Dessert.find({ category: 'dessert' });
		const drinks = await Drink.find({ category: 'drink' });

		const menus = {
			starters,
			mains,
			desserts,
			drinks,
		};
		res.status(200).json(menus);
	} catch (error) {
		console.error('Error fetching menu data:', error);
		res.status(500).json({ success: false, message: 'Failed to fetch data.' });
	}
});

module.exports = router;

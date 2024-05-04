const express = require('express');
const { Dessert, Drink, Main, Starter } = require('../models/menu');

const router = express.Router();

router.put('/api/seoullab/:menuType/:id', async (req, res) => {
	const { menuType, id } = req.params;
	const { category, name, description, price } = req.body;
	let Model;

	switch (menuType) {
		case 'desserts':
			Model = Dessert;
			break;
		case 'drinks':
			Model = Drink;
			break;
		case 'mains':
			Model = Main;
			break;
		case 'starters':
			Model = Starter;
			break;
		default:
			return res.status(404).json({ success: false, message: 'Menu type not found' });
	}

	try {
		const updatedMenu = await Model.findByIdAndUpdate(id, { category, name, description, price }, { new: true });
		if (!updatedMenu) {
			return res.status(404).json({ success: false, message: `${menuType.slice(0, -1)} menu not found` });
		}
		res.json({ success: true, data: updatedMenu });
	} catch (error) {
		console.error(
			`Error updating ${menuType.slice(0, -1).charAt(0).toUpperCase() + menuType.slice(0, -1).slice(1)} menu:`,
			error,
		);
		res
			.status(500)
			.json({ success: false, message: `Failed to update ${menuType.slice(0, -1)} menu.`, error: error.toString() });
	}
});

module.exports = router;

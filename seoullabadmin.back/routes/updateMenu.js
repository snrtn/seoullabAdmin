const express = require('express');
const Menu = require('../models/Menu');

const router = express.Router();

router.put('/api/menus/:id', async (req, res) => {
	const { id } = req.params;
	const { category, name, description, price } = req.body;

	try {
		const updatedMenu = await Menu.findByIdAndUpdate(id, { category, name, description, price }, { new: true });
		if (!updatedMenu) {
			return res.status(404).json({ success: false, message: 'Menu not found' });
		}
		res.json({ success: true, data: updatedMenu });
	} catch (error) {
		console.error('Error updating menu:', error);
		res.status(500).json({ success: false, message: 'Failed to update menu.', error: error.toString() });
	}
});

module.exports = router;

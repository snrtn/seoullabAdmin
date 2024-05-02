const express = require('express');
const Menu = require('../models/Menu');

const router = express.Router();

router.delete('/api/menus/:id', async (req, res) => {
	try {
		const deletedMenu = await Menu.findByIdAndDelete(req.params.id);
		if (!deletedMenu) {
			return res.status(404).json({ success: false, message: 'Menu not found' });
		}
		res.json({ success: true, message: 'Menu deleted successfully.' });
	} catch (error) {
		console.error('Delete Menu Error:', error);
		res.status(500).json({ success: false, message: 'Failed to delete menu.', error: error.toString() });
	}
});

module.exports = router;

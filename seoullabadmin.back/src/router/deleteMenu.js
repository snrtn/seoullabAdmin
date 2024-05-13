const express = require('express');
const { Dessert, Drink, Main, Starter } = require('../models/menu');

const router = express.Router();

const deleteMenu = async (Model, menuType, req, res) => {
	try {
		const deletedMenu = await Model.findByIdAndDelete(req.params.id);
		if (!deletedMenu) {
			return res.status(404).json({ success: false, message: `${menuType} menu not found` });
		}
		res.json({ success: true, message: `${menuType} menu deleted successfully.` });
	} catch (error) {
		console.error(`Delete ${menuType.charAt(0).toUpperCase() + menuType.slice(1)} Menu Error:`, error);
		res.status(500).json({ success: false, message: `Failed to delete ${menuType} menu.`, error: error.toString() });
	}
};

router.delete('/api/seoullab/starters/:id', async (req, res) => {
	await deleteMenu(Starter, 'starters', req, res);
});

router.delete('/api/seoullab/mains/:id', async (req, res) => {
	await deleteMenu(Main, 'mains', req, res);
});

router.delete('/api/seoullab/desserts/:id', async (req, res) => {
	await deleteMenu(Dessert, 'desserts', req, res);
});

router.delete('/api/seoullab/drinks/:id', async (req, res) => {
	await deleteMenu(Drink, 'drinks', req, res);
});

module.exports = router;

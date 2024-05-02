const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema(
	{
		category: {
			type: String,
			required: true,
			trim: true,
		},
		imageUrl: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: false,
			trim: true,
		},
		price: {
			type: Number,
			required: true,
			min: 0,
		},
	},
	{
		timestamps: true,
	},
);

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;

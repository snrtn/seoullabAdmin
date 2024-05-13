const mongoose = require('mongoose');
const { menuConn } = require('../config/database');

const menuSchema = new mongoose.Schema(
	{
		primaryCategory: { type: String, required: true, trim: true },
		secondaryCategory: { type: String, required: true, trim: true },
		name: { type: String, required: true, trim: true },
		description: { type: String, required: false, trim: true },
		price: { type: Number, required: true, min: 0 },
	},
	{ timestamps: true },
);

const Dessert = menuConn.model('Dessert', menuSchema, 'desserts');
const Drink = menuConn.model('Drink', menuSchema, 'drinks');
const Main = menuConn.model('Main', menuSchema, 'mains');
const Starter = menuConn.model('Starter', menuSchema, 'starters');

module.exports = { Dessert, Drink, Main, Starter };

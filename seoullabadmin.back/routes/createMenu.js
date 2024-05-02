const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Menu = require('../models/Menu');
const dropboxService = require('../services/dropboxService');

const router = express.Router();

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
	}
};

const upload = multer({
	storage: storage,
	limits: { fileSize: 50 * 1024 * 1024 },
	fileFilter: fileFilter,
});

router.post('/register-menu', upload.single('image'), async (req, res) => {
	if (!req.file) {
		return res.status(400).json({ success: false, message: 'No file uploaded.' });
	}
	const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);
	try {
		const fileBuffer = fs.readFileSync(filePath);
		const imageUrl = await dropboxService.uploadImageToDropbox(fileBuffer, req.file.filename);
		fs.unlinkSync(filePath);

		const newMenu = new Menu({
			category: req.body.category,
			imageUrl,
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
		});
		await newMenu.save();
		res.status(201).json({ success: true, message: '메뉴가 성공적으로 등록되었습니다.', data: newMenu });
	} catch (error) {
		console.error('Error in register-menu:', error);
		res
			.status(500)
			.json({ success: false, message: 'Failed to register menu. Please try again.', error: error.toString() });
	}
});

module.exports = router;

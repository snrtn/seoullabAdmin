const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');

router.get('/api/menus', async (req, res) => {
	try {
		const menus = await Menu.find({});
		res.status(200).json(menus);
	} catch (error) {
		console.error('메뉴 데이터 가져오기 오류:', error);
		res.status(500).json({ success: false, message: '데이터를 가져오는 데 실패했습니다.' });
	}
});

module.exports = router;

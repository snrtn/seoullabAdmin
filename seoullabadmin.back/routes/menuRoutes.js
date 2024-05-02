const express = require('express');
const createMenu = require('./createMenu');
const updateMenu = require('./updateMenu');
const deleteMenu = require('./deleteMenu');
const getMenus = require('./getMenus');

const router = express.Router();

router.use(createMenu);
router.use(updateMenu);
router.use(deleteMenu);
router.use(getMenus);

module.exports = router;

const express = require('express');
const router = express.Router();
const categoriesController = require('../controller/categoriesController.cjs');



router.get('/',categoriesController.getCategories)

module.exports = router;
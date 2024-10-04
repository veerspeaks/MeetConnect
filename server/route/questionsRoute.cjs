const express = require('express');
const router = express.Router();
const questionsController = require('../controller/questionsController.cjs')




router.get('/', questionsController.getQuestions)

module.exports = router;
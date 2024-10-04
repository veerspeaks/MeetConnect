const express = require('express');
const router = express.Router();
const interviewController = require('../controller/interviewsController.cjs')



router.get('/:userId',interviewController.getInterviews)
router.post('/add', interviewController.addInterview)

module.exports = router;
const express = require('express');
const router = express.Router();
const usersController = require('../controller/usersController.cjs');
const { useContext } = require('react');
const { useResetProjection } = require('framer-motion');



router.get('/',usersController.getUsers)
router.post('/signin', usersController.signIn)
router.post('/signout',usersController.signOut)
router.post('/signup', usersController.signUp)
router.get('/user-info',usersController.getInfo)
router.post('/update',usersController.updateUser)

module.exports = router;
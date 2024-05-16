const express =require('express')
const router =express.Router()
const userController=require('../controllers/userController.js')
const verifyToken = require('../middle/authMiddleware.js');
const checkRole = require('../middle/checkRole.js');
const { getCurrentUser } = require('../controllers/userController');
//const enrollController = require("../controllers/enrollController.js")
//const checkoutController = require("../controllers/checkoutController.js")
//const notificationsController = require("../controllers/notificationsController.js")

router.get('/users', userController.getAllUsers);
router.post('/signup', userController.createUser);
router.post('/signin', userController.signInUser);
router.get('/admin-only',verifyToken,checkRole('admin'), userController.adminOnlyRoute)
router.get('/instructor',verifyToken,checkRole('instructor'), userController.instructorOnlyRoute)
router.get('/user/current', verifyToken, userController.getCurrentUser);










module.exports = router;
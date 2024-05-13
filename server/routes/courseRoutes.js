const express =require('express')
const router =express.Router()
const courseController=require('../controllers/courseController.js')
const cartController = require('../controllers/cartController.js');
const verifyToken = require('../middle/authMiddleware.js');
const checkRole = require('../middle/checkRole.js');
const { getCurrentUser } = require('../controllers/userController');
const {getCourses_Instuctor: getCourses__controller} = require('../controllers/courseController.js')


router.get('/courses/approved-courses', courseController.getApprovedcourses);
router.get('/courses/allcourses', courseController.getAllCourses__controller);
//router.post('/admin-only/new-course', verifyToken , checkRole('admin'), courseController.postCourse__controller);
router.post('/courses/new-course', courseController.postCourse__controller);
router.patch('/courses/update-status/:id', courseController.changeStatus);
router.get('/courses/one-course/:id',courseController.getOneCourse__controller);
router.put('/courses/update-course/:id',courseController.updateAlldata);
router.put('/payment-info',courseController.updateAlldata);
router.delete('/course/delete/:id', courseController.deleteCourse__Controller);
router.post('/cart/addItem/:userId/:courseId', cartController.addToCart)
router.get("/cart/getItem/:userId", cartController.getCartCourses);
//router.delete("/cart/deleteItem/:cartId", cartController.deleteCartCourses);



module.exports = router;
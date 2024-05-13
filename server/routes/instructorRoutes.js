const express =require('express')
const router =express.Router()
const courseController=require('../controllers/courseController.js')
const verifyToken = require('../middle/authMiddleware.js');
const checkRole = require('../middle/checkRole.js');

router.get('/courses/instructor-course/:instructorEmail', courseController.getCourses_Instuctor);
router.put('/courses/instructor/addContent',courseController.updateContent);

module.exports = router;
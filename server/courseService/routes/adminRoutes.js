const express =require('express')
const router =express.Router()
const verifyToken = require('../middle/authMiddleware.js');
const checkRole = require('../middle/checkRole.js');
const courseController = require("../controllers/courseController.js")
//const admincontroller = require("../controllers/adminController.js")


//router.get('/admin/stat', courseController.admin_Stats);
//router.post('/admin/addRequest', admincontroller.addRequest)
//router.get("/admin/getRequest", admincontroller.getRequests);
//router.put("/admin/addRequest/:requestId",admincontroller.updateRequests);



module.exports = router;

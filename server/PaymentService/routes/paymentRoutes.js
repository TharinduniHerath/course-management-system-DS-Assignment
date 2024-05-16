const express = require("express");
const router = express.Router();
const checkoutController =require("../controllers/checkoutController")
const enrollController = require("../controllers/enrollController");

router.post("/create-checkout-session", checkoutController.postCheckout);
router.get('/enrolled-classes/:id',enrollController.getEnrolledCourses );
router.post("/enroll/:userId/:courseId", enrollController.postEnrolledCourses);
//router.put("/payment-info", courseController.updateAlldata);

module.exports = router;
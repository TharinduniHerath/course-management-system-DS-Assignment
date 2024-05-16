const express = require("express")
const router = express.Router()
const cartController = require("../controllers/cartController")

router.post("/cart/addItem/:userId/:courseId", cartController.addToCart);
router.get("/cart/getItem/:userId", cartController.getCartCourses);
//router.delete("/cart/deleteItem/:cartId", cartController.deleteCartCourses);

module.exports = router;
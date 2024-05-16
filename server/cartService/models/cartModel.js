const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course", // Assuming you have a Course model
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
 
});

const CartItem = mongoose.model("CartItem", cartSchema);

module.exports = CartItem;

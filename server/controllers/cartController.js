const CartItem = require("../models/cartModel");


module.exports.addToCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const courseId = req.params.courseId;
  
const cartItem = new CartItem({ courseId, userId });
    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.getCartCourses =  async (req, res) => {
  try {
     const userId = req.params.userId;
    const cartItems = await CartItem.find({ userId: userId }).populate({
      path: "courseId",
      model: "Course", // Assuming the model name of the Course model is 'Course'
      select: " -__v",
    });
    res.json(cartItems);
    if (!cartItems) {
      return res
        .status(404)
        .json({ message: "No cart items found for the user" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
/*
module.exports.deleteCartCourses = async (req, res) => {
 try {
    const { id } = req.params;
    await CourseEnrollment.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
*/
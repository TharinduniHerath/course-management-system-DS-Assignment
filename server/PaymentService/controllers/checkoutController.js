//const CourseEnrollment = require("../models/");
const stripe = require("stripe")(
  "sk_test_51PFmXUSCOFMCLlCHhow2821cxuXmE2cUeFuvr8oppo4Y2wk7UA01VJbyO5NKgWkHQFJHsOPKWREf2NvrrrNsx9EJ00sMpFshjA"
);
module.exports.postCheckout = async (req, res) => {
  try{
     
const cartData = Array.isArray(req.body.cartData) ? req.body.cartData : [];
const lineItems = cartData.map((course) => {
  
  console.log(course);
  
  console.log(course.title);
  return {
    price_data: {
      currency: "USD",
      product_data: {
        name: course?.title || "Course Title Not Available", // Set the course title as the product name
      },
      unit_amount: Math.round(parseFloat(course?.price?.replace('$', '') || '0') * 100),
    },
    quantity: 1,
    
  };
 
});
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:8000/cancel",
  });
    console.log("workingy");
  console.log(cartData);
  const courseId = cartData[0]._id; // Assuming courseId is in the first element of cartData
    const userId = cartData[0].userId; 

   res.json({ sessionId: session.id });
  

  //await CourseEnrollment.create({ userId, courseId });

  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
};

const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    //required: true
  },
  price: {
    type: String,
    //required: true
  },
  videoLink: [
    {
      title: String,
      url: String,
      //required: true
    },
  ],
  instructorEmail: {
    type: String,
    //required: true
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
    //required: true
  },
  totalEnrolled: {
    type: Number,
    default:0
  },

  description: {
    type: String,
    
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;

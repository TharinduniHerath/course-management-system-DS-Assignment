const mongoose = require('mongoose');

const courseEnrollSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', // Assuming you have a Course model
    required: true,
  },
  progress:{
    type: Number,
    default: 0,
    required: true,
  }
});

const CourseEnrollment = mongoose.model('CourseEnrollment', courseEnrollSchema);

module.exports = CourseEnrollment;

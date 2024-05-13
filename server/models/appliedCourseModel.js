const mongoose = require("mongoose");
const appliedSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    courseid: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
      },
    ],
},
  {
    timestamps: true,
  }

 );

const AppliedCourse = mongoose.model('AppliedCourse', appliedSchema);
module.exports = AppliedCourse;

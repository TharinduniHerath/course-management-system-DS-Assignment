
const CourseEnrollment = require("../models/courseEnrollModel");

module.exports.getEnrolledCourses = async (req, res, next) => {
  try {
    const userId = req.params.id;
console.log(userId)
    const enrolledCourses = await CourseEnrollment.find({
      userId: userId,
    }).populate({
      path: "courseId",
      model: "Course", // Assuming the model name of the Course model is 'Course'
      select: "-_id -__v", // Exclude _id and __v fields from the populated document
    }); // Populate the courseId field with the corresponding course details
console.log(enrolledCourses);
    res.status(200).json({
      enrolledCourses,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};



module.exports.postEnrolledCourses = async (req, res, next) => {
 try {
    // Extract userId and courseId from the request body or params
    const courseId = req.params.courseId;
    const userId  = req.params.userId;

    // Check if the user is already enrolled in the course
    const existingEnrollment = await CourseEnrollment.findOne({ userId, courseId });
    if (existingEnrollment) {
      return res.status(400).json({ error: 'User is already enrolled in this course' });
    }

    // Create a new course enrollment document
    const newEnrollment = new CourseEnrollment({
      userId,
      courseId,
    });

    // Save the new enrollment to the database
    await newEnrollment.save();
 res.redirect("/success");
    // Respond with success message
    return res.status(201).json({ message: 'Successfully enrolled user in the course' });
  } catch (error) {
    console.error('Error enrolling user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/*const CourseEnrollment = require("../models/courseEnrollModel");
// Assuming you have already defined your routes and controllers

// Modify the controller function for fetching enrolled courses for a user


  module.exports.getEnrolledCourses = async (req, res, next) => {
    try {
      const userId = req.params.id;
 console.log("workuny");
      const pipeline = [
        {
          $match: { userId: userId }, // Match the user ID
        },
        {
          $lookup: {
            from: "courses", // The collection to join with
            localField: "courseid", // Field from the current collection (CourseEnrollment)
            foreignField: "_id", // Field from the joined collection (courses)
            as: "course", // Output array field name
          },
        },
        {
          $unwind: "$course", // Unwind the course array
        },
        {
          $project: {
            _id: 0,
            courseId: "$course._id",
            courseTitle: "$course.title",
            // Include other course details as needed
          },
        },
      ];
     

      const enrolledCourses = await CourseEnrollment.aggregate(pipeline);

      res.status(200).json({
        enrolledCourses,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  /*try {
    const userId = req.params.id;
    console.log(userId);

    const enrollments = await CourseEnrollment.find({ userId: userId });

    if (!enrollments || enrollments.length === 0) {
      console.log("no courses");
      return res.status(200).json({});
     
    }
    const courses = enrollments.map(enrollment => ({
      courseId: enrollment.courseid,
    
    }));
    return res.status(200).json({ courses });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }*/

/*
    const pipeline = [
      {
        $match: query,
      },
      {
        $lookup: {
          from: "courses",
          localField: "courseid",
          foreignField: "_id",
          as: "courses",
        },
      },
      {
        $unwind: "$courses",
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user", // Unwind the instructor array
      },
      {
        $project: {
          _id: 0,
          user: "$user", // Use $instructor to project the unwound instructor field
          courses: "$courses", // Correct the field name to match the output
        },
      },
    ];

    const enrolledCourses = await CourseEnrollment.aggregate(pipeline);
console.log(enrolledCourses)
    res.status(200).json({
     
      enrolledCourses,
    });*/

/*
module.exports.applyInstructor = async (req, res, next) => {
  try {
   const data = req.body;
   const result = await AppliedCourse.insertOne(data);
   res.status(200).json({
    result,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};

module.exports.viewApplyInstructors = async (req, res, next) => {
  try {
   const email = req.params.email;
   const result = await AppliedCourse.findOne({email});
   res.status(200).json({
    result,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};
/*
user- 663a6355421aed65440e4d56
c- 66399f6b968395eb9416a239
6639c73ad3fb2fad82e4b0d4
*/

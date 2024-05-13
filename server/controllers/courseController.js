const Course = require("../models/courseModel");
const CourseEnrollment = require("../models/courseEnrollModel");
const { ObjectId } = require('mongodb'); 
//const cloudinary = require("../middleware/cloudinary");

module.exports.postCourse__controller = async (req, res, next) => {
  try {
    const { title, image, price, videoLink, instructorEmail, status, totalenrolled, description } = req.body;
/*
    if (!courseDescription || !courseName || !req.file) {
      return res.status(400).json({
        error: "Please Provide All Information",
      });
    }
*/
   // const pic = await cloudinary.uploader.upload(req.file.path);
    //console.log(pic.secure_url)

    //const url = req.protocol + "://" + req.get("host");

    const course = await Course.create({
      title, 
      image, 
      price, 
     
      instructorEmail, 
     
     
      description
    
  })
  res.status(201).json(course);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

module.exports.getApprovedcourses= async (req, res, next) => {
  try {
    //TODO - change email with current user email
    const courses = await Course.find( { status : "approved" });
     res.status(200).json(courses);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};
module.exports.getCourses_Instuctor = async (req, res, next) => {
  try {
    //TODO - change email with current user email
    const email = req.params.instructorEmail;
    console.log(email);
    const courses = await Course.find( { instructorEmail : email });
     res.status(200).json(courses);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};
module.exports.getAllCourses__controller = async (req, res, next) => {
  try {
    const courses = await Course.find();
     res.status(200).json(courses);
    
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getOneCourse__controller = async (req, res, next) => {
  try {
    const courseId  = req.params.id;
    console.log(courseId);
    const course = await Course.findOne({ _id: courseId });
     res.status(200).json(course);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};
module.exports.deleteCourse__Controller = async (req, res, next) => {
  try {
    const { courseId } = req.params.id;
    console.log(courseId);
    const course = await Course.findOneAndDelete({ _id: courseId });
    return res.status(200).json({course, message:"deleted" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};

module.exports.changeStatus = async (req, res, next) => {
  try {
    const id  = req.params.id;
    const status = req.body.status;
  
    const filter = {_id:id};
    const options = {upsert:true}
    const updatedoc = { $set:{status:status }, };

    const course = await Course.updateOne(filter, updatedoc, options );
  res.status(200).json(course);


  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};

module.exports.updateAlldata = async (req, res, next) => {
  try {
    const id  = req.params.id;
    const updateCourse = req.body;
  
    const filter = {_id:id};
    const options = {upsert:true}
    const updatedoc = { $set:{
      title:updateCourse.title, 
      price: updateCourse.price, 
      videoLink: updateCourse.videoLink, 
      totalenrolled:updateCourse.totalenrolled,
      
    }, };

    const course = await Course.updateOne(filter, updatedoc, options );
  res.status(200).json(course);


  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};
/*
module.exports.paymentInfo = async (req, res, next) => {
  try {
    const paymentinfo  = req.body;
    const classesId = paymentinfo.classesId ;
    const userEmail = paymentinfo.userEmail;
    const singleClassId = req.query.classesId;
    let query;
    if(singleClassId){
      query = {_id: singleClassId, userMail: userEmail};
    }else{
      query = {_id: { $in: classesId } };
    }

const classes = await Course.find(query);
const newEnrolledData  = {
  userMail:userEmail,
  classId:singleClassId ? [singleClassId] : classesId,
transactionId:paymentinfo.transactionId
};
const totalEnrolled = classes.reduce((total, current) => total + current.totalenrolled, 0) + 1|| 0;

const updateDoc = {
  $set:{
    totalenrolled:totalEnrolled
}}
await Course.updateMany(query, updateDoc);
return res.status(200).json({ success: true, message: "Payment information updated successfully" });


  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};
*/
module.exports.admin_Stats = async (req, res, next) => {
  try {
    const approvedClasses = await Course.find({ status: 'approved'});
    //const pendingclasses = (await Course.find({ status: 'pending'})).toArray().length;
    //const instructors = (await Course.find({ role: 'instructor'})).toArray().length;
    //const totalclasses = (await Course.find().toArray()).length;
    //const totalEnrolled = (await CourseEnrollment.find().toArray()).length;
    
    
const statData = {
  approvedClasses,
  //pendingclasses,
 // instructors,
  //totalclasses,
  //totalEnrolled
}
res.status(200).json(statData);
    

  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};


module.exports.updateContent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, url } = req.body;

    // Find the course by courseId
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Update the course's videoLink array with the new video link
    course.videoLink.push({ title, url });
    await course.save();

    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
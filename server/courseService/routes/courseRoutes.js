const express =require('express')
const router =express.Router()
const courseController=require('../controllers/courseController.js')

router.get("/courses/allcourses", courseController.getAllCourses__controller);
/*router.post(
  "/admin-only/new-course",
  verifyToken,
  checkRole("admin"),
  courseController.postCourse__controller
);*/
router.post("/courses/new-course", courseController.postCourse__controller);
router.put("/courses/update-course/:id", courseController.updateAlldata);
router.delete("/course/delete/:id", courseController.deleteCourse__Controller);
router.post("/search-courses", courseController.searchCourses);
router.get('/courses/approved-courses', courseController.getApprovedcourses);
router.put("/courses/instructor/addContent/:id", courseController.updateContent);
router.get('/courses/one-course/:id',courseController.getOneCourse__controller);
//router.post('/update-progress',courseController.courseProgress)
router.get(
  "/courses/instructor-course/:instructorEmail",
  courseController.getCourses_Instuctor
);
//router.patch('/courses/update-status/:id', courseController.changeStatus);


module.exports = router;
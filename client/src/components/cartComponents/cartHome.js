import React, { useState, useEffect } from "react";
import "../style.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios"; // Import axios for HTTP requests
import toast from "react-hot-toast";

const Home = () => {
  const [cartCourses, setCartCourses] = useState(null);
  const [approvedCourses, setApprovedCourses] = useState([]);
const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const coursesResponse = await axios.get(
          "http://localhost:8000/api/courses/approved-courses"
        );
        setApprovedCourses(coursesResponse.data);
      
         const userProfileResponse = await axios.get(
          `http://localhost:8000/api/user/current`,config
        );
        setUserProfile(userProfileResponse.data);
        const userId = userProfileResponse.data._id;

         const cartCoursesResponse = await axios.get(
           `http://localhost:8000/api/cart/getItem/${userId}`
         );
         setCartCourses(cartCoursesResponse.data);

  console.log(cartCourses);

        // Assuming response.data is an array of approved courses
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the function to fetch approved courses when the component mounts
  }, []);

  // Add course to cart
  const addToCart = async (course) => {
     try {
      const userId = userProfile._id; // Replace with actual userId
      const courseId = course._id;
     console.log(courseId);
      const response = await axios.post(
        `http://localhost:8000/api/cart/addItem/${userId}/${courseId}`
      );
      console.log("working cart");
      setCartCourses((prevCartCourses) => [...prevCartCourses, course]);
      toast.success("Course added to your cart");
    } catch (error) {
      console.error("Error adding course to cart:", error);
      toast.error("Failed to add course to your cart");
    }
  };

  return (
    <>
      <section className="course_section mt-4 container">
        <h2 className="px-4" style={{ fontWeight: 400 }}>
          Available Courses
        </h2>
        <div className="row mt-2 d-flex justify-content-around align-items-center">
          {approvedCourses.map((course) => (
            <Card
              key={course.id}
              style={{ width: "22rem", border: "none" }}
              className="course_card mb-4"
            >
              <Card.Img
                variant="top"
                className="course_image"
                src={course.image}
              />

              <div className="card_body">
                <div className="course_details d-flex justify-content-between align-items-center">
                  <h4 className="mt-2">{course.title}</h4>
                  <span>Price: ₹ {course.price}</span>
                </div>

                <div className="course_description">
                  <p>{course.description}</p>
                </div>

                <div className="course_actions d-flex justify-content-between align-items-center">
                  <Button
                    style={{
                      width: "150px",
                      background: "#ff3054db",
                      border: "none",
                    }}
                    variant="outline-light"
                    className="mt-2 mb-2"
                    onClick={() => addToCart(course)}
                    disabled={cartCourses && cartCourses.includes(course)}
                  >
                    {cartCourses && cartCourses.includes(course)
                      ? "Added"
                      : "Add To Cart"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;

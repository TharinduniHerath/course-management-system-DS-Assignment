import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from "axios"; 

const HomePage = () => {
    const [approvedCourses, setApprovedCourses] = useState([]);
  useEffect(() => {
   
    const fetchApprovedCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/courses/approved-courses"
        );
        setApprovedCourses(response.data); // Assuming response.data is an array of approved courses
      } catch (error) {
        console.error("Error fetching approved courses:", error);
      }
    };

    fetchApprovedCourses();
  }, []);

  const courseCardStyle = {
    marginBottom: "20px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const imageStyle = {
    maxWidth: "100%",
    borderRadius: "5px",
  };

  const titleStyle = {
    marginTop: "10px",
    fontSize: "1.2rem",
  };

  const descriptionStyle = {
    marginTop: "10px",
  };
  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-between", 
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <Container>
          <h1>Welcome to Our Educational Platform</h1>
          <p>Learn Anything, Anytime, Anywhere</p>
          <Button variant="primary">Explore Courses</Button>
        </Container>
      </div>

      {/* Categories Section */}
      <div className="categories-section">
        <Container>
          <h2>Explore by Category</h2>
          <Row>
            <Col sm={4}>
              <div style={courseCardStyle}>
                <img
                  style={imageStyle}
                  src="
https://img.freepik.com/free-photo/schoolgirl-writing-class_23-2147663427.jpg?size=626&ext=jpg&ga=GA1.1.2075073052.1715301132&semt=ais
"
                  alt="Category 1"
                />
                <h3 style={titleStyle}>Technology</h3>
              </div>
            </Col>
            <Col sm={4}>
              <div style={courseCardStyle}>
                <img
                  style={imageStyle}
                  src="https://img.freepik.com/free-photo/exited-child-doing-homework-finding-solution-home_23-2148224844.jpg?size=626&ext=jpg&ga=GA1.1.2075073052.1715301132&semt=ais
"
                  alt="Category 2"
                />
                <h3 style={titleStyle}>Business</h3>
              </div>
            </Col>
            <Col sm={4}>
              <div style={courseCardStyle}>
                <img
                  style={imageStyle}
                  src="https://img.freepik.com/free-photo/medium-shot-kids-cheating-school_23-2150256554.jpg?size=626&ext=jpg&ga=GA1.1.2075073052.1715301132&semt=ais"
                  alt="Category 3"
                />
                <h3 style={titleStyle}>Health & Wellness</h3>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Featured Courses Section */}
      <div className="featured-courses-section">
        <Container>
          <h2>Featured Courses</h2>
          {/* Course Cards */}
          <Row>
            {approvedCourses &&
              approvedCourses.map((course) => (
                <Col sm={4} key={course._id}>
                  <div style={courseCardStyle}>
                    <img
                      src={course.image}
                      alt={course.title}
                      style={imageStyle}
                    />
                    <h3 style={titleStyle}>{course.title}</h3>
                    <p style={descriptionStyle}>{course.description}</p>
                    <div style={buttonContainerStyle}>
                      <Button variant="primary">Enroll Now</Button>
                      <Button variant="primary">Add to Cart</Button>
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
        </Container>
      </div>

      {/* Other Sections: Top Instructors, Student Testimonials, Upcoming Courses, Personalized Recommendations, etc. */}
      {/* Add these sections as per your design and requirements */}
    </div>
  );
};

export default HomePage;

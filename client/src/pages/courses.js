import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

const CourseDetailsPage = () => {
  const [course, setCourse] = useState(null);
  const { courseId } = useParams();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/courses/one-course/${courseId}`
        ); // Assuming this endpoint returns details of a specific course
        if (!response.ok) {
          throw new Error("Failed to fetch course details");
        }
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  return (
    <Container className="mt-4">
      {course ? (
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
                <Button variant="primary">Enroll Now</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
};

export default CourseDetailsPage;

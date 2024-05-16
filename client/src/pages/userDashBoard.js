import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

function UserDashboard() {
  const [userProfile, setUserProfile] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [coursesInCart, setCoursesInCart] = useState([]);
  const [activeTab, setActiveTab] = useState('profile'); // Default active tab
  const [sidebarOpen, setSidebarOpen] = useState(true);


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    // Fetch user data, payment details, purchased courses, and courses in cart from the backend
    const fetchData = async () => {
      try {
        // Add the token to the request headers
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const userProfileResponse = await axios.get('http://localhost:8000/api/user/current', config);
        setUserProfile(userProfileResponse.data);
        const id = userProfileResponse.data._id;

        const purchasedCoursesResponse = await axios.get(
          `http://localhost:8000/api/enrolled-classes/${id}`,
          config
        );
        setEnrolledCourses(purchasedCoursesResponse.data.enrolledCourses);
     
        //const paymentDetailsResponse = await axios.get('http://localhost:8000/api/user/payment-details', config);
        //setPaymentDetails(paymentDetailsResponse.data);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Username</td>
                <td>{userProfile?.username}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{userProfile?.email}</td>
              </tr>
            </tbody>
          </Table>
        );
      case 'paymentDetails':
        return (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Payment Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentDetails.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.date}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        );
      case 'purchasedCourses':
        return (
          <>
            <h2> Enrolled courses!! </h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Instructor</th>
                </tr>
              </thead>
              <tbody>
                {enrolledCourses &&
                  enrolledCourses.map((course) => (
                    <tr key={course._id}>
                      <td>
                        {course.courseId
                          ? course.courseId.title
                          : "Title Not Available"}
                      </td>
                      <td>
                        {course.courseId
                          ? course.courseId.description
                          : "Description Not Available"}
                      </td>
                      <td>
                        {course.courseId
                          ? course.courseId.instructor
                          : "Instructor Not Available"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </>
        );
 
        

      
      case 'Progress':
        return (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {coursesInCart.map((course) => (
                <tr key={course.id}>
                  <td>{course.title}</td>
                  <td>{course.description}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav
          className={`col-md-2 ${
            sidebarOpen ? "d-block" : "d-none"
          } d-md-block `}
        >
          <div className="side_bar">
            <ul className="nav flex-column">
              <li className="nav-item">
                <button
                  className={`nav-link btn ${
                    activeTab === "profile" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("profile")}
                >
                  Profile
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn ${
                    activeTab === "paymentDetails" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("paymentDetails")}
                >
                  Payment Details
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn ${
                    activeTab === "purchasedCourses" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("purchasedCourses")}
                >
                  Purchased Courses
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn ${
                    activeTab === "Progress" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("Progress")}
                >
                  Courses in Cart
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main content */}
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h2>User Dashboard</h2>
            <button
              className="btn btn-outline-secondary d-block d-md-none"
              onClick={toggleSidebar}
            >
              {sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
            </button>
          </div>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default UserDashboard;
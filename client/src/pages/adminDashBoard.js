import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [userRequirements, setUserRequirements] = useState([]);
   const [editingCourse, setEditingCourse] = useState(null);
  const [instructorRequirements, setInstructorRequirements] = useState([]);
  const [activeTab, setActiveTab] = useState('users'); // Default active tab
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    price: "",
    videoLink: "",
    instructorEmail:"",
    status: "pending",
    totalEnrolled: "",
    description: "",
  });
  
  


  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
         const token = localStorage.getItem("token");
         const config = {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         };
        const usersResponse = await axios.get('http://localhost:8000/api/users');
        setUsers(usersResponse.data);

        const coursesResponse = await axios.get(
          `http://localhost:8000/api/courses/allcourses`,config
        );
        setCourses(coursesResponse.data);
console.log("working here")
console.log(courses);
        //const userRequirementsResponse = await axios.get('http://localhost:8000/api/user-requirements');
        //setUserRequirements(userRequirementsResponse.data);

       // const instructorRequirementsResponse = await axios.get('http://localhost:8000/api/instructor-requirements');
        //setInstructorRequirements(instructorRequirementsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const approveUserRequirement = async (requirementId) => {
    try {
      await axios.post(`http://localhost:8000/api/user-requirements/${requirementId}/approve`);
      setUserRequirements(userRequirements.filter((req) => req.id !== requirementId));
    } catch (error) {
      console.error('Error approving user requirement:', error);
    }
  };

  const approveInstructorRequirement = async (requirementId) => {
    try {
      await axios.post(`http://localhost:8000/api/instructor-requirements/${requirementId}/approve`);
      setInstructorRequirements(instructorRequirements.filter((req) => req.id !== requirementId));
    } catch (error) {
      console.error('Error approving instructor requirement:', error);
    }
  };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api//admin/addRequest/:requestId",
        formData
      );
      console.log("Course addition request sent:", response.data);
      // Clear form data after submission
      setFormData({
        title: "",
        image: "",
        price: "",
        videoLink: "",
        instructorEmail:"",
        status: "pending",
        totalEnrolled: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };
   const handleEdit = (course) => {
      setEditingCourse(course);
      
    };
const handleSubmitEdit = async (courseId , status)  => {
  try {
    

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };  

console.log(status);
    const response = await axios.patch(
      `http://localhost:8000/api/courses/update-status/${courseId}`,
      { status },
      config
    );
    console.log(response);

    console.log("Course details updated:", response.data);

  } catch (error) {
    console.error("Error updating course details:", error);
  }
};

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        );
      case "courses":
        return (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id}>
                  <td>{course.title} </td>
                  <td>{course.description}</td>
                  <td>{course.status} </td>
                  <td>
                    <select
                      value={course.status}
                      onChange={(e) =>
                        handleSubmitEdit(course._id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </Table>
        );
      case "userRequirements":
        return (
          <ul>
            {userRequirements.map((requirement) => (
              <li key={requirement.id}>
                {requirement.description} -{" "}
                <Button
                  variant="success"
                  onClick={() => approveUserRequirement(requirement.id)}
                >
                  Approve
                </Button>
              </li>
            ))}
          </ul>
        );
      case "instructorRequirements":
        return (
          <ul>
            {instructorRequirements.map((requirement) => (
              <li key={requirement.id}>
                {requirement.description} -{" "}
                <Button
                  variant="success"
                  onClick={() => approveInstructorRequirement(requirement.id)}
                >
                  Approve
                </Button>
              </li>
            ))}
          </ul>
        );
      case "CourseRequests":
        return (
          <div className="col-md-6">
            <form onSubmit={handleSubmitRequest}>
              <div className="form-group">
                <label htmlFor="Instructor ">Course Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Course Image</label>
                <input
                  type="text"
                  className="form-control"
                  id="image"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Course Price</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="videoLink">Video Link</label>
                <input
                  type="text"
                  className="form-control"
                  id="videoLink"
                  value={formData.videoLink}
                  onChange={(e) =>
                    setFormData({ ...formData, videoLink: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="totalEnrolled">Total Enrolled Students</label>
                <input
                  type="text"
                  className="form-control"
                  id="totalEnrolled"
                  value={formData.totalEnrolled}
                  onChange={(e) =>
                    setFormData({ ...formData, totalEnrolled: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmitRequest}
              >
                Submit
              </button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };
  

  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block ">
          <div className="side_bar">
            <ul className="nav flex-column inline-block">

              <li className="nav-item">
                <button
                  className={`nav-link btn ${
                    activeTab === "users" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("users")}
                >
                  Users
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`nav-link btn ${
                    activeTab === "courses" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("courses")}
                >
                  Courses
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`nav-link btn ${
                    activeTab === "userRequirements" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("userRequirements")}
                >
                  User Requirements
                </button>
              </li>

             <li className="nav-item">
                <button
                  className={`nav-link btn ${
                    activeTab === "instructorRequirements" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("instructorRequirements")}
                >
                  Instructor Requirements
                </button>
              </li>
                
             

            </ul>
          </div>
        </nav>
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <h2>Admin Dashboard</h2>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;

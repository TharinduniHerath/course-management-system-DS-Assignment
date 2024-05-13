import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button,Form, Modal } from 'react-bootstrap';

function InstructorDashboard() {
  const [instructorProfile, setInstructorProfile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [courseContent, setCoursecontent] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [newCourseSuccess,setNewCourseSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('profile'); // Default active tab
  const [formData, setFormData] = useState({
    title: '',
    course: '',
    thumbnail: '',
    category: '',
    videoTitle: '',
    videoLink: ''


  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

       const instructorProfileResponse = await axios.get('http://localhost:8000/api/user/current', config);
        setInstructorProfile(instructorProfileResponse.data);

        const instructorEmail = instructorProfileResponse.data.email;

        const coursesResponse = await axios.get(`http://localhost:8000/api/courses/instructor-course/${instructorEmail}`, config);
        setCourses(coursesResponse.data);
        
     
       //const response = await axios.get('http://localhost:8000/api/courses', config);
        //setCoursecontent(response.data);
      } catch (error) {
        console.error('Error fetching instructor data:', error);
      }
    };

    fetchData();
  }, []);
//--------------------------------------------------------------------------
  useEffect(() => {
    const timer = setTimeout(() => {
      setDeleteSuccess(false);
    }, 5000); 
    return () => clearTimeout(timer);
  }, [deleteSuccess]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNewCourseSuccess(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [newCourseSuccess]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEditSuccess(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [editSuccess]);

  //-----------------add video
  const handleAddVideo = async (videoDetails) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Example: await axios.post('http://localhost:8000/api/instructor/add-video', videoDetails, config);

      console.log('Video added:', videoDetails);
    } catch (error) {
      console.error('Error adding video:', error);
    }
  };

  const handleCancel = () => {
    // Reset the form fields or any other necessary actions
    setFormData({
      title: '',
      course: '',
      thumbnail: '',
      category: '',
      videoSrc: ''
    });
  };
    //---------------editCourse-----------------------------------------------------------------
    const handleEdit = (course) => {
      setEditingCourse(course);
      setFormData({
        title: course.title,
        price: course.price,
        videoLink: course.videoLink,
        totalEnrolled: course.totalEnrolled
      });
    };
  
    const handleCloseEdit = () => {
      setEditingCourse(null);
      setFormData({
        title: '',
        price: '',
        videoLink:'',
        totalEnrolled: ''
      });
    };
  
    const handleSubmitEdit = async () => {
      try {
       
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        
        const { _id } = editingCourse;
        console.log({_id});
      
        const response = await axios.put(`http://localhost:8000/api/courses/update-course/${_id}`, formData, config);
        console.log(response);
        
        console.log('Course details updated:', response.data);
        handleCloseEdit();
      } catch (error) {
        console.error('Error updating course details:', error);
      }
    };


//-------------------------------------------------------------------------------------------------
//-----------------deleteCourse-------------------------------------------------------------------
const handleDelete = async (courseId) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.delete( `http://localhost:8000/api/course/delete/${courseId}`, config);

    console.log('Course deleted:', response.data);
    setDeleteSuccess(true);
  } catch (error) {
    console.error('Error deleting course:', error);
  }
};


const handleChange = (e) => {
  setFormData({ ...formData, [e.target.id]: e.target.value });
};

const handleSubmitCourse = async (e) => {
  e.preventDefault();
  try {
    
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const response = await axios.post('http://localhost:8000/api/courses/new-course', formData, config);
console.log(response);
    console.log("Course addition request sent.:", response.data);
   // console.log('Course added:', response.data);
      setNewCourseSuccess(true);
    setFormData({
     title:'' , 
      image:'',
      price: '', 
      videoLink:'',
      instructorEmail:'', 
      status:'', 
      totalenrolled:'',
      description:''
    });
  } catch (error) {
    console.error('Error adding course:', error);
  }
};
const handleUpdateContent = async (courseId , title, url) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response =   await axios.put(`http://localhost:8000/api/courses/instructor/addContent/${courseId}`, {title, url});
    console.log("Course updated:", response.data);
  
  } catch (error) {
    console.error("Error adding video:", error);
  }
};
//--------------------------------------------------
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
                <td>{instructorProfile?.username}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{instructorProfile?.email}</td>
              </tr>
            </tbody>
          </Table>
        );
        //-------------------------------------------------------------------
      case 'courses':
        return (
          <>
            {deleteSuccess && (
              <div className="alert alert-success" role="alert">
                Course successfully deleted!
              </div>
            )}
            {editSuccess && (
              <div className="alert alert-success" role="alert">
                Course successfully edited!
              </div>
            )}

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>price</th>

                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.title}</td>
                    <td>{course.description}</td>
                    <td>{course.price}</td>

                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleEdit(course)}
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(course.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Modal show={!!editingCourse} onHide={handleCloseEdit}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Course</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="image">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEdit}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmitEdit}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
//-------------------------------------------------------------------------------------------------------------------------
        case 'addcourse':
        return (
          <div className="col-md-6">
            {newCourseSuccess && (
              <div className="alert alert-success" role="alert">
                Course successfully added!
              </div>
            )}
            <Form onSubmit={handleSubmitCourse}>
              <Form.Group controlId="title">
                <Form.Label>Course Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter course title"
                  value={formData.title} // Bind value to formData
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  } // Update formData on change
                  className="form-control"
                />
              </Form.Group>

              <Form.Group controlId="image">
                <Form.Label>Course Thumbnail</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter course image"
                  value={formData.image} // Bind value to formData
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  } // Update formData on change
                  className="form-control"
                />
              </Form.Group>

              <Form.Group controlId="price">
                <Form.Label>Course Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter course price"
                  value={formData.price} // Bind value to formData
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  } // Update formData on change
                  className="form-control"
                />
              </Form.Group>

              

              <Form.Group controlId="instructorEmail">
                <Form.Label>Instructor Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter instructor email"
                  value={formData.instructorEmail} // Bind value to formData
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      instructorEmail: e.target.value,
                    })
                  } // Update formData on change
                  className="form-control"
                />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>descriptions</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter course description"
                  value={formData.description} // Bind value to formData
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  } // Update formData on change
                  className="form-control"
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={handleSubmitCourse}
                className="btn btn-primary mb-3"
              >
                Add Course
              </Button>
              <Button variant="danger" type="button" className="btn btn-danger mb-3">
                Cancel
              </Button>
            </Form>
          </div>
        );
      case 'courseContent':
        return (
          <>
            {deleteSuccess && (
              <div className="alert alert-success" role="alert">
                Course successfully deleted!
              </div>
            )}{" "}
            <div>
              <h2>Course Content</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Video Title</th>
                    <th>Video</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course._id}>
                      <td>{course.title}</td>
                      <td>
                        {course.videoLink.map((video) => (
                          <div key={video.title}>{video.title}</div>
                        ))}
                      </td>
                      <td>
                        {course.videoLink.map((video) => (
                          <div key={video.url}>
                            <video src={video.url} controls />
                          </div>
                        ))}
                      </td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => handleEdit(course)}
                        >
                          Edit
                        </Button>{" "}
                       
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Modal show={!!editingCourse} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group controlId="videoTitle">
                      <Form.Label> Enter Video Title </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter new title"
                        value={formData.videoTitle}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            videoTitle: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseEdit}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSubmitEdit}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>

              <h2>Update Course Content</h2>
              <Form>
                <Form.Group controlId="courseId">
                  <Form.Label>Select Course</Form.Label>
                  <Form.Control as="select">
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.title}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="videoTitle">
                  <Form.Label>Video Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter video title"
                    value={formData.videoTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, videoTitle: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="videoUrl">
                  <Form.Label>Video URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter video URL"
                    value={formData.videoUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, videoUrl: e.target.value })
                    }
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleUpdateContent}
                >
                  Update Content
                </Button>
              </Form>
            </div>
          </>
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
                    activeTab === "addcourse" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("addcourse")}
                >
                  Add courses
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn ${
                    activeTab === "courseContent" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("courseContent")}
                >
                  Uploaded Videos
                </button>
              </li>
            </ul>
          </div>
        </nav>
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <h2>Welcome {instructorProfile?.username}</h2>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default InstructorDashboard;

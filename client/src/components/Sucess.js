import "./style.css"; // Import CSS file for styling
import React, { useState } from "react";
import axios from "axios";

function PaySuccess({ userId, courseId }){
const [enrollmentError, setEnrollmentError] = useState(null);

const handleEnroll = async () => {
    try {
      // Make a POST request to enroll the user in the course
      const response = await axios.post(
        `http://localhost:8000/api/enroll/${userId}/${courseId}`
      );

      // Handle success, maybe redirect to a confirmation page
      alert("Enrollment successful!");
    } catch (error) {
     console.error("Error enrolling course :", error);
     setEnrollmentError("An error occurred while enrolling in the course");
  };
}
  return (
    <div className="success">
      <div className="success-container">
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase.</p>
        <p>Now you can access the course you purchased.</p>
       <div>
      <button onClick={handleEnroll}>Enroll</button>
      {enrollmentError && <p>{enrollmentError}</p>}
    </div>
        {/* Additional information or actions can be added here */}
      </div>
    </div>
  );
};

export default PaySuccess;

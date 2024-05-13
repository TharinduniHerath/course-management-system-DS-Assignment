import React, { useState } from "react";
import axios from "axios";

const NotificationForm = () => {
  const [formData, setFormData] = useState({
    message: "",
    timestamp: new Date().toISOString(), // Set current timestamp
    role: "", // Initialize role as empty string
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to your backend endpoint
      const response = await axios.post(
        "http://localhost:8000/api/create-notifications",
        formData
      );

      // Reset form data after successful submission
      setFormData({
        message: "",
        timestamp: new Date().toISOString(),
        role: "",
      });

      // Handle success
      console.log("Notification posted successfully:", response.data);
    } catch (error) {
      // Handle error
      setError("Failed to post notification");
      console.error("Error posting notification:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
     
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <input
            type="text"
            className="form-control"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            className="form-select"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="instructor">Instructor</option>
            <option value="user">User</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NotificationForm;

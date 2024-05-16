import React, { useEffect, useState } from "react";
import axios from "axios";


const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        console.log("working1");
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        console.log("working2");
        // Fetch current user profile
        const profileResponse = await axios.get(
          "http://localhost:8000/api/user/current",
          config
        );
        console.log("working3");
        const { role } = profileResponse.data;
        setUserProfile(profileResponse.data);

        // Fetch notifications based on user's role
        const notificationsResponse = await axios.get(
          `http://localhost:8000/api/notifications/${role}`,
          config
        );
        setNotifications(notificationsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setLoading(false); // Stop loading even if there's an error
        console.log("working1");
      }
    };

    fetchNotifications();
  }, []); // Empty dependency array to run effect only once

  return (
    <div className="notifications-page">
      <h1 className="page-title">Notifications</h1>
      {!loading ? (
        notifications.length > 0 ? (
          <ul className="notification-list">
            {notifications.map((notification, index) => (
              <li key={index} className="notification-item">
                {notification.message}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-notifications">No notifications found.</p>
        )
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  );
};

export default NotificationsPage;

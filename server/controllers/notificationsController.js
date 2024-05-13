
/*
module.exports.getRequests = async (req, res, next) => {
    try {
    const courseRequests = await CourseRequest.find();
    res.json(courseRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports.updateRequests = async (req, res) => {
  try {
    const requestId = req.params.id;
    const { status } = req.body;

    const updatedRequest = await CourseRequest.findByIdAndUpdate(requestId, { status }, { new: true });

    res.json(updatedRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
*/
// Route to fetch notifications based on user role
const Notifications = require('../models/notificationsModel');

module.exports.getNotifications = async (req, res) => {

  const { role } = req.params;
  try {
    const notifications = await Notifications.find({ role: role });
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

module.exports.postNotifications = async (req, res) => {
  try {
    const { message, timestamp, role } = req.body;
    const newNotification = new Notifications({
      message: message,
      timestamp: timestamp,
      role: role,
    });

    // Save the new notification to the database
    const notification = await newNotification.save();

    res.status(201).json(notification);
  } catch (error) {
    console.error("Error posting notifications:", error);
    res.status(500).json({ error: "Failed to post notifications" });
  }
};
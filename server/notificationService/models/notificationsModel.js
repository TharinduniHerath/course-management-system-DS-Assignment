const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  role:{
     type: String,
    required: true,
  },
  
},{
    timestamps: true,
  }
);

const Notifications = mongoose.model("Notifications", notificationSchema);

module.exports = Notifications;

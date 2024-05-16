const express = require("express");
const router = express.Router();
const notificationsController = require("../controllers/notificationsController")

router.get("/notifications/:role", notificationsController.getNotifications);
router.post("/create-notifications", notificationsController.postNotifications);

module.exports = router;
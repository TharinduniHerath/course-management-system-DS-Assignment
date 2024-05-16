const express = require("express");
const cors = require("cors");
const app = express();
//const connectToMongoCart = require("../server/cartService/config/db.js");
//const connectToMongoCourse = require("../server/courseService/config/db.js");
//const connectToMongoNotif = require("../server/notificationService/config/db.js");
//const connectToMongoUser = require("../server/userService/config/db.js");
const connectToMongo = require("../server/config/db.js")

const userRoutes = require("../server/userService/routes/userRoutes.js");
const courseRoutes = require("../server/courseService/routes/courseRoutes.js");
const cartRoutes = require("../server/cartService/routes/cartRoutes.js");
const notificationRoutes = require("../server/notificationService/routes/notificationsRoutes.js");
const paymentRoutes = require("../server/PaymentService/routes/paymentRoutes.js");

const PORT = process.env.PORT;

app.use(cors()); // Use cors middleware first
app.use(express.json());

// Connect to MongoDB
//connectToMongoCart();
//connectToMongoCourse();
//connectToMongoNotif();
//connectToMongoUser();
connectToMongo();

// Define routes
app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", cartRoutes);
app.use("/api", notificationRoutes);
app.use("/api", paymentRoutes);

app.get("/", (req, res) => {
  res.send("api is running");
});

app.listen(PORT, () => {
  console.log(`api is running on http://localhost:${PORT}`);
});

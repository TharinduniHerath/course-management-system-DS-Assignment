const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const conncetToMongoCourse = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI_COURSE);

    if (res) {
      console.log("Connected to MongoDB for Cart Service");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = conncetToMongoCourse;

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const conncetToMongoUser = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI_USER);

    if (res) {
      console.log("connected to user db sucessfully");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = conncetToMongoUser;

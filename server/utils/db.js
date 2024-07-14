const mongoose = require("mongoose");
const URL = "mongodb://127.0.0.1:27017/Admin-Dashboard";

const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("connection established");
  } catch (err) {
    console.error("database connection error");
    process.exit(0);
  }
};
module.exports = connectDB;

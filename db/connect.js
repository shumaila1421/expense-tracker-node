const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.Mongo_URI);
    console.log("MONGODB IS CONNECTED");
  } catch (error) {
    console.log("Mongodb connection error", error);
  }
};

module.exports = connectDB;

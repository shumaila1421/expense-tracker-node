const mongoose = require("mongoose");

const userSchema = new mongoose.userSchema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxLenght: 8,
      minLenght: 4,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxLenght: 8,
      minLenght: 3,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      maxLenght: 8,
      minLenght: 5,
      required: true,
    },
  },
  { timestap: true },
);

module.exports = mongoose.model("User", userSchema);

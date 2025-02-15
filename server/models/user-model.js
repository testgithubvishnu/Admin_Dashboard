const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "please enter the username"],
    },
    email: {
      type: String,
      require: [true, "please enter the email"],
      unique: [true, "Email alreday exists"],
    },
    phone: {
      type: String,
      require: [true, "please enter the phone"],
    },
    password: {
      type: String,
      require: [true, "please enter the phone"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
userSchema.methods.generateToken = async function () {
  // console.log(" I am Token");
  try {
    return JWT.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      "pass123",
      {
        expiresIn: "30d",
      }
    );
  } catch (err) {
    console.error("Token error", err);
  }
};

const User = new mongoose.model("User", userSchema);

module.exports = User;

const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const home = async (req, res) => {
  try {
    await res.status(200).send("welcome my app");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = await req.body;

    //mandatory fiels:
    if (!username || !email || !password || !phone) {
      res.status(400).send("All field are mandatory");
    }

    //Already exists fields:
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "email already exists" });
    }

    //Hashing password:
    const saltRound = 10;
    const hashPassword = await bcrypt.hash(password, saltRound);

    const user = await User.create({
      username,
      email,
      phone,
      password: hashPassword,
    });

    if (user) {
      res.status(200).json({
        msg: "User created successfully",
        userId: user._id.toString(),
        token: await user.generateToken(),
      });
    } else {
      res.status(404).send("user data is not valid");
    }
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send("All fields are required");
    }
    const user = await User.findOne({ email });

    //if user exists:
    //compare password:
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        msg: "Login successfully",
        userId: user._id.toString(),
        token: await user.generateToken(),
      });
      await res.status(200).json({ accessToken });
    }
    //if user not exist:
    else {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { home, register, loginUser };

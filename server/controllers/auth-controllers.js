const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const home = async (req, res) => {
  try {
    await res.status(200).send("welcome my app");
  } catch (err) {
    console.error(err);
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
    console.log(`User created: ${user}`);

    if (user) {
      res
        .status(200)
        .json({
          _id: user.id,
          email: user.email,
          token: await user.genearateToken(),
        });
    } else {
      res.status(404).send("user data is not valid");
    }
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = await req.body;
    if (!email || !password) {
      res.status(400).send("All fields are required");
    }
    const user = await User.findOne({ email });

    //compare password:
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = await JWT.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        },
        "admin123",
        { expiresIn: "20m" }
      );
      await res.status(200).json({ accessToken });
    } else {
      await res.status(400).send("email or password is not valid");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { home, register, loginUser };

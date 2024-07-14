const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controllers");

//Method 1:
// router.get("/", (req, res) => {
//   res.status(200).send("welcome my app");
// });

//Method 2:
router.route("/").get(authController.home);

router.route("/register").post(authController.register);
router.route("/login").post(authController.loginUser);
module.exports = router;

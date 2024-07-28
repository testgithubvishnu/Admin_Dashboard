const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controllers");
const authMiddleware = require("../middlewares/authMiddleware");
//Method 1:
// router.get("/", (req, res) => {
//   res.status(200).send("welcome my app");
// });

//Method 2:
router.route("/").get(authController.home);

router.route("/register").post(authController.register);
router.route("/login").post(authController.loginUser);
router.route("/user").get(authMiddleware, authController.user);
module.exports = router;

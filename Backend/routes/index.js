const express = require("express");
const registerController = require("../controllers/registerController");

const loginController = require("../controllers/loginController");
const { loginUser, logoutUser } = require("../controllers/userController");
const router = express.Router();

// Define routes
router.get("/", (req, res) => {
  res.send("Welcome to the User Route");
});

router.post("/create", (req, res) => {
  res.send("User Created");
});

router.post("/register", registerController.store);
;
router.post("/login",loginController.login);

router.post("/signin",registerController.store)
router.post("/signout",logoutUser)

// Export router
module.exports = router;

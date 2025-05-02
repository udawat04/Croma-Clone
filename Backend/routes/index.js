const express = require("express");
const registerController = require("../controllers/registerController");

const loginController = require("../controllers/loginController");
const { loginUser, logoutUser } = require("../controllers/userController");
const {
  addToCart,
  getCartByUser,
  removeFromCart,
  updateCart,
} = require("../controllers/addtocartController");

const router = express.Router();

// Define routes


router.post("/create", (req, res) => {
  res.send("User Created");
});

router.post("/register", registerController.store);
;
router.post("/login",loginController.login);
router.post("/googlelogin",loginUser)

router.post("/signin",registerController.store)
router.post("/signout",logoutUser)

router.post("/addcart", addToCart);

router.get("/user/:userId", getCartByUser);; 

router.delete("/user/:userId/product/:productId", removeFromCart);; 
router.put("/updatecart", updateCart); 


// Export router
module.exports = router;

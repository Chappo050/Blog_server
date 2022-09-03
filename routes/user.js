var express = require("express");
const passport = require("passport");
const authCheck = require("../authCheck"); //checking if the user is already logged in or not
var router = express.Router();
const userController = require("../controllers/userController");

//GET//
/* GET users listing. */
router.get("/", userController.init);

router.get(
  "/login",
  authCheck.checkNotAuthenticated,
  userController.user_login_get
);

//testing if logged in
router.get("/secret", authCheck.checkAuthenticated, (req, res) =>
  res.json({ message: "you found a secret" })
);

//POST//

//create new user from form.
router.post("/register", userController.register_new_user);

router.post(
  "/login",
  userController.user_login_post
);

router.get(
  "/logout",
  userController.user_logout
);

module.exports = router;

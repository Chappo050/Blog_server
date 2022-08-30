var express = require("express");
const passport = require("passport");
const authCheck = require('../authCheck');
var router = express.Router();
const userController = require("../controllers/userController");


//GET//
/* GET users listing. */
router.get("/", userController.init);

router.get("/login", userController.user_login_get);

//testing if logged in
router.get('/secret', authCheck.checkAuthenticated, (req, res) => res.json({message:'you found a secret'}))

//POST//

//create new user from form.
router.post("/register", userController.register_new_user);

//create a blog post
router.post("/:userId/post", userController.create_new_post);


router.post('/login', userController.user_login_post);



module.exports = router;


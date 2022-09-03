var express = require("express");
const authCheck = require("../authCheck"); //checking if the user is already logged in or not
var router = express.Router();
const blogController = require("../controllers/blogController");

//GET//
/* GET users listing. */
router.get("/overview", blogController.get_post_list);

router.get("/:userId", blogController.get_user_post_list);

router.get("/overview/count", blogController.count_posts);

router.get("/:userId/count", blogController.count_posts_user);

router.get('/post', authCheck.checkAuthenticated, blogController.get_posting_page)




//POST//

router.post('/post', authCheck.checkAuthenticated, blogController.create_new_post)

module.exports = router;

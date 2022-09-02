"use strict";

var express = require("express");

var authCheck = require("../authCheck"); //checking if the user is already logged in or not


var router = express.Router();

var blogController = require("../controllers/blogController"); //GET//

/* GET users listing. */


router.get("/overview", blogController.get_post_list);
router.get('/post', authCheck.checkAuthenticated, blogController.get_posting_page); //POST//

router.post('/post', authCheck.checkNotAuthenticated, blogController.create_new_post);
module.exports = router;
var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

//GET//
/* GET users listing. */
router.get('/', userController.init);

///POST///

//create new user from form.
router.post('/create', userController.create_new_user)

//create a blog post
router.post('/:userId/post', userController.create_new_post)


module.exports = router;

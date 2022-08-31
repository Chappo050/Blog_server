const { body, validationResult } = require("express-validator"); //Data parsing
const Post = require("../models/post.js");
const User = require("../models/user.js");

exports.create_new_post = [
    //Trim data
      //Add extra data validation
      body("message", "Please enter a message").trim().isLength({ min: 1 }).escape(),
      body("isPublic", "Public by default").trim().isLength({ min: 1 }).escape(),
      // Process request after validation and sanitization.
      (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
    
        // Create a post object with escaped and trimmed data.
        
        const current_time = Date.now()
    
        const post = new Post(
          {
            user_details: req.user.id,
            message: req.body.message,
            post_time: current_time,
            public: req.body.isPublic,
          }
    
        );
    
        if (!errors.isEmpty()) {
          // There are errors. Return data and erros as JSON
          console.log('here');
          res.json({
            user,
            errors: errors.array(),
          });
          return;
        } else {
    
          // Data from form is valid.
          // Check if post with same date/time by user already exists.
          Post.findOne({ username: req.body.message, post_time: current_time }).exec((err, found_message_copy) => {
            if (err) {
              return next(err);
            }
    
            if (found_message_copy) {
              // Post exists.
              res.json({message: "Post already exists."});
            } else {
              post.save((err) => {
                if (err) {
                  return next(err);
                }

                res.json({message: "Post successfully added to database"});
              });
            }
          });
        }
      },
    
    
    ]

exports.get_posting_page = (req, res, next) => {
  
  res.json({message: "Welcome to the posting page"})
}


// Display list of all books.
exports.get_post_list = (req, res, next) => {
 
  Post.find({}, {'__v': 0})
  .sort({post_time: -1})
  .limit(10)
  .populate('user_details', {'__v': 0, 'password': 0})
  .exec(function (err, list_posts) {
    if (err) {return next(err);}
    //Successful, so send JSON
    res.json(list_posts);
  });

};
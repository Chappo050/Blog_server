const Genre = require("../models/user");

// Display list of all Genre.
exports.init = (req, res, next) => {
  res.json({Message: 'Hello, welcome to the users page'})
};



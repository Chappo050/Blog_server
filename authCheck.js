
//Middleware functions
exports.checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
  
    res.redirect("/user/login");
  };
  
exports.checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.redirect("/");
    }
  
    return next();
  };
  
  

//Middleware functions
exports.checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
  
    res.status(403).json({message: "please log in"});
  };
  
exports.checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.status(403).json({message: "Already logged in"});
    }
  
    return next();
  };
  
  
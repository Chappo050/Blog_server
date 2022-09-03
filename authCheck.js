
//Middleware functions
exports.checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
  
    res.status(403).redirect('/user/login');
  };
  
exports.checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.status(403).redirect('/');
    }
  
    return next();
  };
  
  
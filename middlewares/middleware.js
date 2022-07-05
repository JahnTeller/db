const jwt = require("jsonwebtoken");
const User = require("../models/user");
const verifyToken = async (req, res, next) => {
  const token = await req.headers.token?.split(" ")[1];
  if (token) {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(404).json("Not authorized, no token");
    }
    req.user = await User.findById(decoded.id).select("-password");
    // console.log("helop")
    next();
  } else {
    // return res.status(403).json("Not authorized, no token")
    return next(new NotAuthorizedError());
  }
};

const verifyAdmin = async (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.status(404).json(err);
      }
      if (user.user.isAdmin) {
        console.log(user);
        res.user = user.user;
        // console.log(user.user)
        next();
      } else {
        return res.status(403).json("Token is not valid");
      }
    });
  } else {
    return res.status(403).json("You're not authenticated");
    // return next(new NotAuthorizedError());
  }
};
module.exports = { verifyToken, verifyAdmin };

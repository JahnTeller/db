const jwt = require("jsonwebtoken");
const User = require("../models/user");
const verifyToken = async (req, res, next) => {
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You're not authenticated");
  }
};

const verifyAdmin = async (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(404).json(err);
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

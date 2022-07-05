const jwt = require("jsonwebtoken");
const User = require("../models/user");
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.token.split(" ")[1];
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err.name === "TokenExpiredError") {
        const payload = jwt.verify(token, process.env.JWT_SECRET, {
          ignoreExpiration: true,
        });

        // res.status(200).json({ status: true, token: refreshToken });
        next();
      } else if (err) {
        res.status(401).json({ status: false, result: "Invalid token" });
      }
    });
  } catch (e) {
    //console.log(e);
    res.status(401).json({ status: false, result: "Token does not exist" });
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

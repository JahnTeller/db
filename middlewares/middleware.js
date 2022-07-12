const jwt = require("jsonwebtoken");
const User = require("../models/user");
const verifyToken = async (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];
  if (token) {
    // const accessToken = await req.headers.token?.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json(err);
      }
      console.log(user)
      req.user = user;
      next();
    });
    // const decode = await jwt.verify(token, process.env.JWT_SECRET)
    // console.log(decode)
  } else {
    return res.status(401).json("You're not authenticated");
  }
};

const verifyAdmin = async (req, res, next) => {
  // const token = req.headers.token?.split(" ")[1];
  // if (token) {
  //   // console.log(token)
  //   console.log(process.env.JWT_SECRET)
  //   const decode = await jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

  //     console.log(user)
  //   })
  //   // jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
  //   //   if (err) {
  //   //     return res.status(404).json(err);
  //   //   }
  //   //   console.log(user)
  //   //   // if (user.user?.isAdmin) {
  //   //   //   console.log(user);
  //   //   //   res.user = user.user;
  //   //   //   // console.log(user.user)
  //   //   //   next();
  //   //   // } else {
  //   //   //   return res.status(403).json("Token is not valid");
  //   //   // }
  //   // });
  // } else {
  //   return res.status(403).json("You're not authenticated");
  //   // return next(new NotAuthorizedError());
  // }
  if (req.user?.isAdmin) {
    next()
  }
  // console.log(req)
};
module.exports = { verifyToken, verifyAdmin };

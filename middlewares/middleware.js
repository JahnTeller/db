const jwt = require("jsonwebtoken")
const User = require("../models/user")
const verifyToken =  async(req,res,next) => {
    const token = await req.headers.token?.split(" ")[1]
    if(token) {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded){
            return res.status(404).json('Not authorized, no token')
        }
        req.user = await User.findById(decoded.id).select("-password");
        next();
    }
    else{
        return res.status(403).json("Not authorized, no token")
    }
}

const verifyAdmin = async(req,res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
      } else {
        res.status(401);
        throw new Error("Not authorized as an Admin");
      }
}
module.exports = { verifyToken, verifyAdmin };
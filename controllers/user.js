const User = require("../models/user")
const generateToken = require("../utils/generateToken");

const userController = {
    login: async(req,res) => {
        try {
            const { email, password} = req.body
            const user = await User.findOne({email: email})
            if(user && (await user.matchPassword(password))){
                return res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user._id),
                    createAt: user.createdAt,
                  });
            }
        } catch (error) {
            res.status(500).json(`Error ${error}`)
        }
    },
    register: async(req,res) => {
        try {
            const { username, password, isAdmin, role , email} = req.body
            const user = await User.findOne({email})
            console.log(user)
            if(user){
                return res.status(404).json("User is exist")
            }
            const newUser = new User({
                email: email,
                password: password,
                isAdmin: isAdmin,
                role: role,
                username: username
            })
            const saveUser = await newUser.save()
            res.status(200).json(saveUser)
        } catch (error) {
            res.status(500).json(`Error ${error}`)
        }
    },
    getAll: async(req,res) => {
        try {
            const users = await User.find()
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json(`Error ${error}`)
        }
    },
}

module.exports = userController
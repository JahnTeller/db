const User = require("../models/user");
const generateToken = require("../utils/generateToken");
const Department = require("../models/department");
const Situation = require("../models/situation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      const validPassword = await bcrypt.compare(password, user.password);
      if (user && validPassword) {
        const token = await jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "24h" },
          { algorithm: "HS256" }
        );
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: token,
          createAt: user.createdAt,
        });
      }
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },
  register: async (req, res) => {
    try {
      const { username, password, isAdmin, role, email } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        return res.status(404).json("User is exist");
      }
      const hash = await bcrypt.hash(password, 10);
      const newUser = new User({
        email: email,
        password: hash,
        isAdmin: isAdmin,
        role: role,
        username: username,
      });
      const saveUser = await newUser.save();
      res.status(200).json(saveUser);
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },
  getAll: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },
  getByRole: async (req, res) => {
    try {
      const user = req.user;
      const role = user.role;
      const isAdmin = user.isAdmin;
      let department;
      let situation;
      if (isAdmin) {
        department = await Department.find();
        situation = await Situation.find();
      } else {
        department = await Department.findOne({ name: role });
        situation = await Situation.find({ departmentId: department._id });
      }
      res.status(200).json({
        department,
        situation,
      });
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },
};

module.exports = userController;

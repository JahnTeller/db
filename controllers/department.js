const Department = require("../models/department");
const Situation = require("../models/situation");
const departmentController = {
  create: async (req, res) => {
    try {
      const department = new Department(req.body);
      const newDepartment = await department.save();

      res.status(200).json(newDepartment);
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },
  edit: async (req, res) => {
    try {
      const id = req.params.id;
      const deparment = await Department.findByIdAndUpdate(id, {
        $set: req.body,
      });
      res.status(200).json("Update success");
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },
  del: async (req, res) => {
    try {
      await Department.findByIdAndDelete(req.params.id);
      await Situation.updateMany(
        { departmentId: req.params.id },
        { $pull: { departmentId: req.params.id } }
      );
      res.status(200).json("Delete success");
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },
  get: async (req, res) => {
    try {
      const department = await Department.findOne({
        _id: req.params.id,
      }).populate("situation", "-desc");
      res.status(200).json(department);
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },
  getAll: async (req, res) => {
    try {
      const departments = await Department.find().populate(
        "situation",
        "-desc"
      );
      res.status(200).json(departments);
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },
  pagination: async (req, res) => {
    try {
      const page = req.params.page || 1;
      const limit = 10;
      const depart = await Department.countDocuments();

      const departments = await Department.find({})
        .skip(page * limit - limit)
        .limit(limit)
        .populate("situation", "-desc");
      const maxPage = Math.ceil(depart / limit);
      res.status(200).json({ departments, maxPage });
    } catch (error) {
      res.status(500).json(`Erorr ${error}`);
    }
  },
};

module.exports = departmentController;

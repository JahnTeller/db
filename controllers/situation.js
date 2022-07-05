const Situation = require("../models/situation");
const Department = require("../models/department");
const Mark = require("../models/mark");
const base64 = require("base-64");
const situationController = {
  create: async (req, res) => {
    try {
      const situation = new Situation(req.body);
      situation.markModified("situation");
      const newSituation = await situation.save();
      if (req.body.departmentId) {
        const department = await Department.findById(req.body.departmentId);
        // await Department.findByIdAndUpdate(req.body.departmentId, {$push: { $situation: newSituation._id}})
        // console.log(department);
        await department.updateOne({ $push: { situation: newSituation._id } });
        // console.log(department);
      }
      // console.log(newSituation);
      res.status(200).json(newSituation);
    } catch (error) {
      console.log(error);
      res.status(500).json(`Error ${error}`);
    }
  },
  edit: async (req, res) => {
    try {
      const id = req.params.id;
      const situation = await Situation.findOne({ _id: id });
      if (!situation) {
        return res.status(404).json("Situation not found");
      }
      const newSituation = await situation.updateOne({ $set: req.body });
      res.status(200).json("update success");
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },
  del: async (req, res) => {
    try {
      const id = req.params.id;
      await Situation.findByIdAndDelete(id);
      await Department.updateMany(
        { situation: id },
        { $pull: { situation: id } },
        { multi: true }
      );
      res.status(200).json("Delete success");
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const situation = await Situation.findOne({ _id: id })
        .populate("departmentId", "_id name")
        .populate("diagnose", "name isTrue");
      if (!situation) {
        return res.status(404).json("Situation not found");
      }
      res.status(200).json(situation);
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },
  getByDepartment: async (req, res) => {
    try {
      const idDepart = req.params.id;
      const situation = await Situation.find({ departmentId: idDepart })
        .populate("departmentId")
        .populate("diagnose");
      if (!situation) {
        return res.status(404).json("Situation not found");
      }
      res.status(200).json(situation);
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },
  getAll: async (req, res) => {
    try {
      const situation = await Situation.find()
        .populate("departmentId", "name")
        .populate("diagnose", "name _id isTrue")
        .select("-desc");
      if (!situation) {
        return res.status(400).json("Situation is empty");
      }
      console.log(situation.length);
      res.status(200).json(situation);
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },
  resMark: async (req, res) => {
    try {
      const { mark, id } = req.params;
      const situation = await Situation.findOne({ _id: id });
      const prevMark = situation.avarageMark;
      if (mark > prevMark) {
        situation.updateOne({ avarageMark: mark });
      }
      res.status(200).json("success");
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },
  search: async (req, res) => {
    try {
      const keyword = req.query.keyword.trim();
      console.log(keyword);
      const situation = await Situation.find({
        name: { $regex: keyword, $options: "i" },
      });
      res.status(200).json(situation);
    } catch (error) {
      res.status(500).json(`Error :${error}`);
    }
  },
  pagination: async (req, res) => {
    try {
      const page = req.params.page || 1;
      let perPage = 16;
      const situation = await Situation.find()
        .skip(perPage * page - perPage)
        .limit(perPage)
        .populate("diagnose", "name isTrue situationId")
        .populate("departmentId", "-situation")
        .select("-desc");
      res.status(200).json(situation);
    } catch (error) {
      res.status(500).json(`Error :${error}`);
    }
  },
  submit: async (req, res) => {
    try {
      const user = req.user._id;
      // console.log(user)
      const { marks, situationId } = req.body;
      const newMark = new Mark({
        userId: user,
        situation: situationId,
        marks: marks,
      });
      const saveMark = await newMark.save();
      const situation = await Situation.findOne({ _id: situationId });
      const times = situation.times + 1;
      console.log({ newMark, times });
      await situation.updateOne({ times: times });
      res.status(200).json(saveMark);
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },
};

module.exports = situationController;

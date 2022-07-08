const Treatment = require("../models/treatment");
const Diagnose = require("../models/diagnose");
const Situation = require("../models/situation");
const treatmentController = {
  create: async (req, res) => {
    try {
      const treatment = new Treatment(req.body);
      if (req.body.diagnose) {
        await Diagnose.findByIdAndUpdate(req.body.diagnose, {
          $push: { treatment: treatment._id },
        });
      }
      const newTreatment = await treatment.save();
      res.status(200).json(newTreatment);
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },
  edit: async (req, res) => {
    try {
      const updateTreatment = await Treatment.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Update success");
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },
  del: async (req, res) => {
    try {
      await Treatment.findByIdAndDelete(req.params.id);
      await Diagnose.updateOne(
        { treatment: req.params.id },
        { treatment: null }
      );
      res.status(200).json("Delete success");
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },
  get: async (req, res) => {
    try {
      const treatment = await Treatment.findOne({ _id: req.params.id })
        .populate("diagnose", "-desc")
        .populate("situation", "-desc");
      res.status(200).json(treatment);
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },
  getAll: async (req, res) => {
    try {
      const page = req.query.page || 1;
      const limit = 10;
      const count = await Treatment.countDocuments();
      const treatment = await Treatment.find()
        .skip(page * limit - limit)
        .limit(limit)
        .populate("diagnose", "-desc")
        .populate("situation", "-desc");
      const maxPage = Math.ceil(count / limit);
      res.status(200).json({ treatment, maxPage });
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },
  search: async (req, res) => {
    try {
      const keyword = req.query.keyword?.toLowerCase();
      let treatment;
      if (keyword === "undefined" || keyword === undefined) {
        treatment = await Treatment.find()
          .populate("diagnose", "-desc")
          .populate("situation", "-desc");
      } else {
        treatment = await Treatment.find({
          $or: [{ name: { $regex: keyword } }, { note: { $regex: keyword } }],
        })
          .populate("diagnose", "-desc")
          .populate("situation", "-desc");
      }
      res.status(200).json(treatment);
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },
};

module.exports = treatmentController;

const Diagnose = require("../models/diagnose");
const Treatment = require("../models/treatment");
const Pre = require("../models/pre");
const diagnoseController = {
  create: async (req, res) => {
    try {
      const diagnose = new Diagnose(req.body);
      const newDiagnose = await diagnose.save();
      if (req.body.preliminary) {
        const pre = await Pre.findByIdAndUpdate(req.body.preliminary, {
          $push: { diagnoses: newDiagnose._id },
        });
      }
      res.status(200).json(newDiagnose);
    } catch (error) {
      res.status(500).json(`Error: ${error}`);
    }
  },
  edit: async (req, res) => {
    try {
      const diagnose = await Diagnose.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Update successfully");
    } catch (error) {
      res.status(500).json(`Error: ${error}`);
    }
  },
  del: async (req, res) => {
    try {
      await Diagnose.findByIdAndDelete(req.params.id);
      await Pre.updateOne(
        { diagnose: req.params.id },
        { $pull: { diagnose: req.params.id } }
      );
      await Treatment.updateMany(
        { diagnose: req.params.id },
        { diagnose: null }
      );
      res.status(200).json("Delete successfully");
    } catch (error) {
      res.status(500).json(`Error: ${error}`);
    }
  },
  get: async (req, res) => {
    try {
      const diagnose = await Diagnose.findOne({ _id: req.params.id })
        .populate("treatments", "name _id isTrue")
        .populate({
          path: 'preliminary', select: 'name',
          populate: {
            path: 'situation', select: 'name'
          }
        });
      res.status(200).json(diagnose);
    } catch (error) {
      res.status(500).json(`Error: ${error}`);
    }
  },
  getAll: async (req, res) => {
    try {
      const preliminary = req.query.preliminary;
      const page = req.query.page || 1;
      const limit = 10;
      // console.log(situationId);
      const fullDiagnose = await Diagnose.countDocuments();
      let diagnose;
      if (preliminary === "undefined" || preliminary === undefined) {
        diagnose = await Diagnose.find({})
          .populate("treatments", "name _id isTrue")
          .populate({
            path: 'preliminary',
            populate: {
              path: 'situation', select: 'name'
            }
          })
          .select("-desc")
          .skip(page * limit - limit)
          .limit(limit);
      } else if (preliminary !== "undefined") {
        diagnose = await Diagnose.find({ preliminary: preliminary })
          .populate("treatments", "name _id isTrue")
          .populate("preliminary", "-desc")
          .select("-desc")
          .skip(page * limit - limit)
          .limit(limit);
      }
      const maxPage = Math.ceil(fullDiagnose / limit);
      // console.log(diagnose.length, fullDiagnose);
      res.status(200).json({ diagnose, maxPage });
    } catch (error) {
      res.status(500).json(`Error: ${error}`);
    }
  },
  getByPreliminary: async (req, res) => {
    try {
      const preliminaryid = req.params.preliminaryid;
      const diagnoses = await Diagnose.find({ preliminary: preliminaryid }).populate("preliminary", "name")
      res.status(200).json(diagnoses)
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },
  search: async (req, res) => {
    try {
      const keyword = req.query.keyword;
      let diagnose;
      if (keyword === "undefined" || keyword === undefined) {
        diagnose = await Diagnose.find()
          .populate("treatments", "-desc")
          .select("-desc");
      } else {
        diagnose = await Diagnose.find({
          name: { $regex: keyword, $options: "i" },
        })
          .populate("treatments", "-desc")
          .select("-desc");
      }
      res.status(200).json(diagnose);
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },
};

module.exports = diagnoseController;

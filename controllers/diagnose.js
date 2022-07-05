const Diagnose = require("../models/diagnose");
const Situation = require("../models/situation");
const diagnoseController = {
  create: async (req, res) => {
    try {
      const diagnose = new Diagnose(req.body);
      const newDiagnose = await diagnose.save();
      if (req.body.situationId) {
        const situation = await Situation.findById(req.body.situationId);
        // await Situation.findByIdAndUpdate(req.body.situationId, {$push: {$diagnose: diagnose._id}})
        await situation.updateOne({ $push: { diagnose: newDiagnose._id } });
        // console.log(situation)
        if (req.body.done) {
          // await Situation.findByIdAndUpdate(req.body.situationId, { isFinish: true })
          await situation.updateOne({ $isFinish: true });
        }
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
      await Situation.updateOne(
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
        .populate("situationId", "-desc")
        .populate("treatment", "-desc");
      res.status(200).json(diagnose);
    } catch (error) {
      res.status(500).json(`Error: ${error}`);
    }
  },
  getAll: async (req, res) => {
    try {
      const situationId = req.query.situationId;
      const page = req.query.page || 1;
      const limit = 10;
      // console.log(situationId);
      let diagnose;
      if (situationId === "undefined" || situationId === undefined) {
        diagnose = await Diagnose.find({})
          .populate("treatment", "-desc")
          .populate("situationId", "-desc")
          .select("-desc")
          .skip(page * limit - limit)
          .limit(limit);
      } else if (situationId !== "undefined") {
        diagnose = await Diagnose.find({ situationId: situationId })
          .populate("treatment", "-desc")
          .populate("situationId", "-desc")
          .select("-desc")
          .skip(page * limit - limit)
          .limit(limit);
      }
      res.status(200).json(diagnose);
    } catch (error) {
      res.status(500).json(`Error: ${error}`);
    }
  },
};

module.exports = diagnoseController;

const Pre = require("../models/pre");
const Situation = require("../models/situation");
const pre = {
  getAll: async (req, res) => {
    try {
      const situation = req.query.situation?.toLowerCase();
      const page = req.query.page || 1;
      const limit = 10;
      let pre;
      if (situation === "undefined" || situation === undefined) {
        pre = await Pre.find({})
          .skip(limit * page - limit)
          .limit(limit)
          .populate("situation", "-desc");
      } else {
        pre = await Pre.find({ situation: situation })
          .skip(limit * page - limit)
          .limit(limit)
          .populate("situation", "-desc");
      }

      res.status(200).json(pre);
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const pre = await Pre.findById(id)
        .populate("diagnoses", "-desc");
      res.status(200).json(pre);
    } catch (error) {
      res.status(500).json(`Erorr ${error}`);
    }
  },
  post: async (req, res) => {
    try {
      const pre = await Pre.create(req.body);
      if (req.body.situation) {
        const situation = await Situation.findByIdAndUpdate(
          req.body.situation,
          { $push: { preliminaries: pre._id } }
        );
      }
      res.status(200).json({ pre, message: "Created successfully" });
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },
  put: async (req, res) => {
    try {
      const id = req.params.id;
      const pre = await Pre.findByIdAndUpdate(
        id,
        { $set: req.body },
        { returnDocument: "after" }
      );
      res.status(200).json({ pre, message: "Updated successfully" });
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      await Pre.findByIdAndDelete(id);
      if (pre.diagnose.length > 0) {
        await Diagnose.deleteMany({ preliminary: pre._id });
      }
      await Situation.updateOne(
        { premilinaries: req.params.id },
        { $pull: { premilinaries: req.params.id } }
      );
      res.status(200).json("delete Success")
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },
  search: async (req, res) => {
    try {
      const keyword = req.query.keyword?.toLowerCase();
      const pre = await Pre.find({ name: { $regex: keyword } });
      res.status(200).json(pre);
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },
  getBySituation: async (req, res) => {
    try {
      const situationId = req.params.situationId;
      const preliminaries = await Pre.find({ situation: situationId }).populate("diagnoses", "name")
      res.status(200).json(preliminaries)
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  }
};
module.exports = pre;

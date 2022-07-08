const Mark = require("../models/mark");
const markController = {
  getAll: async (req, res) => {
    try {
      const orderBy = req.query.orderBy?.toLowerCase();
      const situation = req.query.situation;
      let marks;
      const mark = await Mark.countDocuments();
      if (situation) {
        if (orderBy === "asc") {
          marks = await Mark.find({ situation: situation })
            .sort({ marks: 1 })
            .populate("situation", "name");
        } else if (orderBy === "desc") {
          marks = await Mark.find({ situation: situation })
            .sort({ marks: -1 })
            .populate("situation", "name");
        } else {
          marks = await Mark.find({ situation: situation }).populate(
            "situation",
            "name"
          );
        }
        // res.status(200).json(marks);
      } else {
        marks = await Mark.find({}).populate("situation", "name");
      }
      res.status(200).json(marks);
    } catch (error) {
      res.status(500).json(`Erorr ${error}`);
    }
  },
};

module.exports = markController;

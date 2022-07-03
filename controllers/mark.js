const Mark = require("../models/mark");
const markController = {
  getAll: async (req, res) => {
    try {
      const mark = await Mark.find().populate("situation");
      res.status(200).json(mark);
    } catch (error) {
      res.status(500).json(`Erorr ${error}`);
    }
  },
};

module.exports = markController;

const Mark = require("../models/mark");
const markController = {
  getAll: async (req, res) => {
    try {
      const marks = await Mark.find().populate("situation", "name");
      res.status(200).json(marks);
    } catch (error) {
      res.status(500).json(`Erorr ${error}`);
    }
  },
};

module.exports = markController;

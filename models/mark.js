const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
  situation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Situation",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  marks: {
    type: Number,
    default: 0,
    required: true,
  },
});

module.exports = mongoose.model("Mark", marksSchema);

const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
  situation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Situation",
  },
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    default: 0,
    required: true,
  },
  times: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Mark", marksSchema);

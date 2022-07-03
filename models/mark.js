const mongoose = require("mongoose");

const markSchema = new mongoose.Schema({
  situation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Situation",
  },
  userId: {
    type: String,
    required: true,
  },
  mark: {
    type: Number,
    default: 0,
    required: true,
  },
  times: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Mark", markSchema);

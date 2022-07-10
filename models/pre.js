const mongoose = require("mongoose");

const premilinary = new mongoose.Schema(
  {
    situation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Situation",
    },
    desc: {
      type: String,
      required: true,
    },
    diagnose: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Diagnose",
      },
    ],
    name: {
      type: String,
    },
    isTrue: {
      type: Boolean,
      default: false,
    },
    treatment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Treatment",
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Premilinary", premilinary);

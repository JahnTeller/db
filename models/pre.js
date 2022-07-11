const mongoose = require("mongoose");

const preliminarySchme = new mongoose.Schema(
  {
    situation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Situation",
    },
    desc: {
      type: String,
      required: true,
    },
    diagnoses: [
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
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Preliminary", preliminarySchme);

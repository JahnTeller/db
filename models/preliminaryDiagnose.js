const mongoose = require("mongoose");

const finalDiagnoseSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

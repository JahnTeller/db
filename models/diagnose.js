const mongoose = require("mongoose");

const diagnoseSchema = new mongoose.Schema(
  {
    premilinary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Premilinary",
    },
    desc: {
      type: String,
      required: true,
    },
    treatment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Treatment",
      },
    ],
    name: {
      type: String,
      required: true,
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

module.exports = mongoose.model("Diagnose", diagnoseSchema);

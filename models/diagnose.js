const mongoose = require("mongoose");

const diagnoseSchema = new mongoose.Schema(
  {
    preliminary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Preliminary",
    },
    treatments: [
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

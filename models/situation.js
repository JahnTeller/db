const mongoose = require("mongoose");

const situationSchema = new mongoose.Schema(
  {
    desc: {
      type: String,
      required: true,
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    name: {
      type: String,
      required: true,
    },
    premilinary: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Premilinary",
      },
    ],
    isExam: {
      type: Boolean,
      default: false,
    },
    times: {
      type: Number,
      default: 0,
    },
    isFinish: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Situation", situationSchema);

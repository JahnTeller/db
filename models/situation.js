const mongoose = require("mongoose")

const situationSchema = new mongoose.Schema(
    {
        desc: {
            type: String,
            required: true
        },
        departmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department"
        },
        avarageMark: {
            type: Number,
            default: 0 
        },
        name: {
            type: String, 
            required: true
        },
        diagnose: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Diagnose"
            }
        ]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Situation", situationSchema)
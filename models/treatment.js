const mongoose = require("mongoose")

const treatmentSchema = new mongoose.Schema({
    diagnose: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Diagnose"
    },
    situation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Situation"
    },
    isTrue: {
        type: Boolean,
        required: true,
        default: false
    },
    desc: {
        type: String, 
        required: true
    },
    note: {
        type: String,
    },
    name: {
        type: String,
        required: true
    }
},{
    timestamps: true
})
module.exports = mongoose.model("Treatment", treatmentSchema)
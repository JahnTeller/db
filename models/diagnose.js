const mongoose = require("mongoose")

const diagnoseSchema = new mongoose.Schema({
    situationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Situation"
    },
    desc: { 
        type: String, 
        required: true
    },
    treatment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Treatment"
        }
    ],
    name: {
        type: String, 
        required: true
    },

},{
    timestamps: true
})

module.exports = mongoose.model("Diagnose", diagnoseSchema)
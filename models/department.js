const mongoose = require("mongoose")

const departmentSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        unique: true
    },
    situation: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Situation"
        }
    ]
},{
    timestamps: true
})

module.exports = mongoose.model("Department", departmentSchema)
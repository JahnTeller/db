const mongoose = require("mongoose")

const markSchema = new mongoose.Schema({
    situation: {
        type: String,
        required: true
    },
    userId: {
        type: String, 
        required: true
    },
    mark: {
        type: Number, 
        default: 0,
        required: true
    }
})

module.exports = mongoose.model("Mark", markSchema)
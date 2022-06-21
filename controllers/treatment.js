const Treatment = require("../models/treatment")
const Diagnose = require("../models/diagnose")
const Situation = require("../models/situation")
const treatmentController = {
    create: async(req,res) => {
        try {
            const treatment = new Treatment(req.body)
            if(req.body.diagnose){
                await Diagnose.findByIdAndUpdate(req.body.diagnose, { $push: { treatment: treatment._id}})
            }
            const newTreatment = await treatment.save()
            res.status(200).json(newTreatment)
        } catch (error) {
            res.status(500).json(`Error ${error}`)
        }
    },
    edit: async(req,res) => {
        try {
            const updateTreatment = await Treatment.findByIdAndUpdate(req.params.id, {$set: req.body})
            res.status(200).json("Update success")
        } catch (error) {
            res.status(500).json(`Error ${error}`)
        }
    },
    del: async(req,res) => {
        try {
            await Treatment.findByIdAndDelete(req.params.id)
            await Diagnose.updateOne({treatment: req.params.id}, { treatment: null})
            res.status(200).json("Delete success")
        } catch (error) {
            res.status(500).json(`Error ${error}`)
        }
    },
    get: async(req,res) => {
        try {
            const treatment = await Treatment.findOne({_id: req.params.id})
            res.status(200).json(treatment)
        } catch (error) {
            res.status(500).json(`Error ${error}`)
        }
    },
    getAll: async(req,res) => {
        try {
            const treatment = await Treatment.find()
            res.status(200).json(treatment)
        } catch (error) {
            res.status(500).json(`Error ${error}`)
        }
    },
}

module.exports = treatmentController
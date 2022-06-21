const Diagnose = require("../models/diagnose")
const Situation = require("../models/situation")
const diagnoseController = {
    create: async(req,res) => {
        try {
            const diagnose = new Diagnose(req.body)
            if(req.body.situationId){
                await Situation.findByIdAndUpdate(req.body.situationId, {$push: {diagnose: diagnose._id}})
            }
            const newDiagnose = await diagnose.save()
            res.status(200).json(newDiagnose)
        } catch (error) {
            res.status(500).json(`Error: ${error}`)
        }
    },
    edit: async(req,res) => {
        try {
            const diagnose = await Diagnose.findByIdAndUpdate(req.params.id, {$set: req.body})
            res.status(200).json("Update successfully")
        } catch (error) {
            res.status(500).json(`Error: ${error}`)
        }
    },
    del: async(req,res) => {
        try {
            await Diagnose.findByIdAndDelete(req.params.id)
            await Situation.updateOne({diagnose: req.params.id}, {diagnose: null})
            res.status(200).json("Delete successfully")
        } catch (error) {
            res.status(500).json(`Error: ${error}`)
        }
    },
    get: async(req,res) => {
        try {
            const diagnose = await Diagnose.findOne({_id: req.params.id})
            res.status(200).json(diagnose)
        } catch (error) {
            res.status(500).json(`Error: ${error}`)
        }
    },
    getAll: async(req,res) => {
        try {   
            const situationId = req.query.situationId || undefined
            let diagnose 
            if(situationId){
                diagnose = await Diagnose.find({situationId: situationId})
            }else{
                diagnose = await Diagnose.find()
            }
            res.status(200).json(diagnose)
        } catch (error) {
            res.status(500).json(`Error: ${error}`)
        }
    },
}

module.exports = diagnoseController
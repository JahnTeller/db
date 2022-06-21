const Situation = require("../models/situation")
const Department = require("../models/department")
const situationController = {
    create: async(req, res) => {
        try {
            const situation = new Situation(req.body)
            if(req.body.departmentId){ 
                await Department.findByIdAndUpdate(req.body.departmentId , {$push: {situation: situation._id}})
            }
            const newSituation = await situation.save()

            res.status(200).json(newSituation)
        } catch (error) {
            res.status(500).json(`Error ${error}`)
        }
    },
    edit: async(req, res) => {
        try {
            const id = req.params.id
            const situation = await Situation.findOne({_id: id})
            if(!situation){
                return res.status(404).json("Situation not found")
            }
            const newSituation = await situation.updateOne({$set: req.body})
            res.status(200).json("update success")
        } catch (error) {
            res.status(500).json(`Error ${error}`)
        }
    },
    del: async(req, res) => {
        try {
            const id = req.params.id
            await Situation.findByIdAndDelete(id)
            await Department.updateMany({situation: id}, { situation: null})
            res.status(200).json("Delete success")
        } catch (error) {
            res.status(500).json(`Error ${error}`)
        }
    },
    get: async(req, res) => {
        try {
            const id = req.params.id
            const situation = await Situation.findOne({_id: id})
            if(!situation){
                return res.status(404).json("Situation not found")
            }
            res.status(200).json(situation)
        } catch (error) {
            res.status(500).json(`Error ${error}`)
        }
    },
    getByDepartment: async(req, res) => {
        try {
            const idDepart = req.params.id
            const situation = await Situation.find({departmentId: idDepart}).populate("departmentId")
            if(!situation){
                return res.status(404).json("Situation not found")
            }
            res.status(200).json(situation)
        } catch (error) {
            res.status(500).json(`Error ${error}`)
        }
    },
    getAll: async(req, res) => {
        try {
            const limit = req.query.limit || 10
            const page = req.query.page || 1
            const situation = await Situation.find().limit(limit)
            if(!situation){
                return res.status(400).json("Situation is empty")
            }
            res.status(200).json(situation)
        } catch (error) {
            res.status(500).json(`Error ${error}`)
        }
    },
    resMark: async(req,res) => {
        try {
            const {mark, id} = req.params
            const situation = await Situation.findOne({_id: id})
            const prevMark = situation.avarageMark
            if(mark > prevMark){
                situation.updateOne({avarageMark: mark})
            }
            res.status(200).json("success")
        } catch (error) {
            res.status(500).json(`Error ${error}`)            
        }
    }
}

module.exports = situationController
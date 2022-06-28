const Situation = require("../models/situation")
const Department = require("../models/department")
const Mark = require("../models/mark")
const  base64 = require("base-64")
const situationController = {
    create: async(req, res) => {
        try {
            const situation = new Situation(req.body)
            // console.log(situation)
            const newSituation = await situation.save()
            if(req.body.departmentId){ 
                const department = await Department.findById(req.body.departmentId)
                await department.updateOne({$push: {situation: newSituation._id}})
                console.log(department)
            }
            console.log(newSituation)
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
            await Department.updateMany({situation: id}, { $pull: {situation: id}})
            res.status(200).json("Delete success")
        } catch (error) {
            res.status(500).json(`Error ${error}`)
        }
    },
    get: async(req, res) => {
        try {
            const id = req.params.id
            const situation = await Situation.findOne({_id: id}).populate("departmentId")
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
            const situation = await Situation.find().limit(limit).populate("departmentId")
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
    },
    search: async(req,res) => {
        try {
            const keyword = req.query.keyword.trim()
            console.log(keyword)
            const  situation = await Situation.find({name: {$regex: keyword, $options: "i"}})
            res.status(200).json(situation)
        } catch (error) {
            res.status(500).json(`Error :${error}`)
        }
    },
    pagination: async(req, res) => {
        try {
            const page = req.params.page || 1
            let perPage = 16; 
            const situation = await Situation.find() .skip((perPage * page) - perPage).limit(perPage)
            res.status(200).json(situation)
        } catch (error) {
            res.status(500).json(`Error :${error}`)
        }
    },
    submit: async(req,res) => {
        try {
            const user = req.user._id
            // console.log(user)
            const {mark, situationId} = req.body
            const newMark = new Mark({
                userId: user,
                situation: situationId,
                mark: mark
            })
            const saveMark = await newMark.save()
            const situation = await Situation.findOne({_id: situationId})
            const times = situation.times
            console.log({newMark, times})
            await situation.updateOne({times: times + 1})
            res.status(200).json(saveMark)
        } catch (error) {
            res.status(500).json(`Error ${error}`)
        }
    }
}

module.exports = situationController
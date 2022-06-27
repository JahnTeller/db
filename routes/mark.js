const router = require("express").Router()
const controller = require("../controllers/mark")
// router.get()
router.get("/", controller.getAll)
module.exports = router

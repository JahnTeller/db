const router = require("express").Router()
const controller = require("../controllers/situation")
const { verifyAdmin, verifyToken} = require("../middlewares/middleware")
router.put("/:id",verifyToken, verifyAdmin, controller.edit)
router.delete("/:id",verifyToken, verifyAdmin, controller.del)
router.get("/page/:page", controller.pagination)
router.get("/department/:id",verifyToken, verifyAdmin, controller.getByDepartment)
router.post("/search", controller.search )
router.post("/submit", verifyToken, controller.submit)
router.post("/",verifyToken, verifyAdmin, controller.create)
router.get("/:id", controller.get)
router.get("/", controller.getAll)

module.exports = router
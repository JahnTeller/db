const router = require("express").Router();
const controller = require("../controllers/treatment");
const { verifyToken } = require("../middlewares/middleware");
router.get("/search", controller.search);
router.get("/:id", controller.get);
router.post("/", verifyToken, controller.create);
router.put("/:id", verifyToken, controller.edit);
router.delete("/:id", verifyToken, controller.del);
// router.get("/diagnose/:id", controller.getByDiagnose)
router.get("/", controller.getAll);
module.exports = router;

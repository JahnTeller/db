const router = require("express").Router();
const controller = require("../controllers/pre");

router.get("/getbysituationid/:situationId", controller.getBySituation)
router.get("/search", controller.search);
router.get("/:id", controller.get);
router.put("/:id", controller.put);
router.delete("/:id", controller.delete);
router.post("/", controller.post);
router.get("/", controller.getAll);
module.exports = router;

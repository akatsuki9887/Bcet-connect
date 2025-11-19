const router = require("express").Router();
const controller = require("./event.controller");
const auth = require("../../middleware/authMiddleware");

router.post("/", auth, controller.createEvent);
router.get("/", auth, controller.getEvents);
router.get("/:id", auth, controller.getEventDetails);
router.post("/:id/register", auth, controller.registerEvent);

module.exports = router;

const router = require("express").Router();
const controller = require("./mentorship.controller");
const auth = require("../../middleware/authMiddleware");

// 🧑‍🏫 Mentors list (alumni + faculty)
router.get("/", auth, controller.getMentors);

// 🧑‍🏫 Mentor detail
router.get("/:id", auth, controller.getMentorDetail);

// 📩 Send mentorship request
router.post("/request", auth, controller.sendRequest);

// 💬 Chat history with a mentor/user
router.get("/chat/:id", auth, controller.getChat);

// 💬 Send new chat message
router.post("/chat/:id", auth, controller.sendChatMessage);

module.exports = router;

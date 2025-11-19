const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: "BCET CONNECT API" });
});

router.use("/auth", require("../modules/auth/auth.routes"));
router.use("/user", require("../modules/user/user.routes"));
router.use("/feed", require("../modules/feed/feed.routes"));
router.use("/jobs", require("../modules/jobs/job.routes"));
router.use("/events", require("../modules/events/event.routes"));
router.use("/communities", require("../modules/communities/community.routes"));
router.use("/mentorship", require("../modules/mentorship/mentorship.routes"));


module.exports = router;

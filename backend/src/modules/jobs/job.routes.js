const router = require("express").Router();
const controller = require("./job.controller");
const auth = require("../../middleware/authMiddleware");
const role = require("../../middleware/roleMiddleware");
const validateRequest = require("../../middleware/validateRequest");
const { createJobSchema, applyJobSchema } = require("./job.validation");

// 🔹 POST JOB — only alumni, faculty, admin
router.post(
  "/",
  auth,
  role(["alumni", "faculty", "admin"]),
  validateRequest(createJobSchema),
  controller.postJob
);

// 🔹 GET ALL JOBS — any logged-in user
router.get("/", auth, controller.getJobs);

// 🔹 GET JOB DETAIL
router.get("/:id", auth, controller.getJobDetails);

// 🔹 APPLY TO JOB — student (and optionally alumni)
router.post(
  "/:id/apply",
  auth,
  role(["student", "alumni"]), // tum chaho to sirf "student" bhi kar sakte ho
  validateRequest(applyJobSchema),
  controller.applyJob
);

module.exports = router;

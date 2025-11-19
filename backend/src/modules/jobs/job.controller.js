const catchAsync = require("../../utils/catchAsync");
const jobService = require("./job.service");

exports.postJob = catchAsync(async (req, res) => {
  const job = await jobService.postJob(req.body, req.user.id);

  res.status(201).json({
    success: true,
    message: "Job posted successfully",
    data: job,
  });
});

exports.getJobs = catchAsync(async (req, res) => {
  // future me query params se filters aa sakte hain
  const jobs = await jobService.getJobs();

  res.json({
    success: true,
    data: jobs,
  });
});

exports.getJobDetails = catchAsync(async (req, res) => {
  const job = await jobService.getJobDetails(req.params.id);

  res.json({
    success: true,
    data: job,
  });
});

exports.applyJob = catchAsync(async (req, res) => {
  const job = await jobService.applyJob(
    req.params.id,
    req.user.id,
    req.body.resume // URL
  );

  res.json({
    success: true,
    message: "Applied successfully",
    data: job,
  });
});

const Job = require("./job.model");
const ApiError = require("../../utils/ApiError");

exports.postJob = async (data, userId) => {
  const jobData = {
    ...data,
    postedBy: userId,
  };

  const job = await Job.create(jobData);
  return job;
};

exports.getJobs = async (filters = {}) => {
  const query = {
    isApproved: true,
    ...filters,
  };

  const jobs = await Job.find(query)
    .populate("postedBy", "name avatar role")
    .sort({ createdAt: -1 });

  return jobs;
};

exports.getJobDetails = async (jobId) => {
  const job = await Job.findById(jobId).populate(
    "postedBy",
    "name avatar role"
  );

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  return job;
};

exports.applyJob = async (jobId, userId, resumeUrl) => {
  const job = await Job.findById(jobId);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  // Check if already applied
  const alreadyApplied = job.applicants.some(
    (app) => app.user.toString() === userId.toString()
  );

  if (alreadyApplied) {
    throw new ApiError(400, "You have already applied to this job");
  }

  job.applicants.push({
    user: userId,
    resume: resumeUrl,
  });

  await job.save();

  return job;
};

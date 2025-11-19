import { useEffect, useState } from "react";
import api from "../../../services/apiClient";
import JobCard from "../components/JobCard";
import JobFilters from "../components/JobFilters";

export default function JobsListPage() {
  const [jobs, setJobs] = useState([]);

  const loadJobs = () => {
    api.get("/jobs").then((res) => {
      setJobs(res.data.data);
    });
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div className="space-y-4 max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold">Available Jobs</h1>

      <JobFilters />

      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
}

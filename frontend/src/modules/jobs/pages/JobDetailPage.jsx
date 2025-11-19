import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/apiClient";
import JobMatchWidget from "../components/JobMatchWidget";

export default function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    api.get(`/jobs/${id}`).then((res) => setJob(res.data.data));
  }, [id]);

  if (!job) return <p className="p-4">Loading...</p>;

  const handleApply = () => {
    api.post(`/jobs/${id}/apply`, { resume: "resume.pdf" });
    alert("Applied Successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">{job.title}</h1>
      <p className="text-lg text-gray-600">{job.company}</p>
      <p className="text-gray-500">{job.location}</p>

      <h2 className="font-semibold text-lg mt-4">Description</h2>
      <p>{job.description}</p>

      <JobMatchWidget jobSkills={job.skills} />

      <button
        onClick={handleApply}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Apply Now
      </button>
    </div>
  );
}

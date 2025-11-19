import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <Link to={`/jobs/${job._id}`}>
      <div className="p-4 border rounded bg-white shadow hover:shadow-lg transition cursor-pointer">
        <h3 className="font-bold text-xl">{job.title}</h3>
        <p className="text-gray-600">{job.company}</p>
        <p className="text-gray-400">{job.location}</p>

        <div className="flex gap-2 mt-3">
          {job.skills?.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

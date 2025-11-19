import { Link } from "react-router-dom";

export default function MentorCard({ mentor }) {
  return (
    <Link to={`/mentorship/${mentor._id}`}>
      <div className="p-4 border rounded bg-white shadow hover:shadow-lg transition">
        <div className="flex gap-3 items-center">
          <img
            src={mentor.avatar || "/default-avatar.png"}
            className="w-16 h-16 rounded-full object-cover"
          />

          <div>
            <h3 className="font-bold text-lg">{mentor.name}</h3>
            <p className="text-gray-500 text-sm">{mentor.role}</p>
          </div>
        </div>

        {mentor.skills?.length > 0 && (
          <p className="text-xs mt-3 text-gray-600">
            Skills: {mentor.skills.join(", ")}
          </p>
        )}
      </div>
    </Link>
  );
}

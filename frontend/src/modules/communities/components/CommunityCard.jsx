import { Link } from "react-router-dom";

export default function CommunityCard({ community }) {
  return (
    <Link to={`/communities/${community._id}`}>
      <div className="p-4 border rounded bg-white shadow hover:shadow-lg transition">
        <h2 className="text-xl font-bold">{community.name}</h2>
        <p className="text-gray-600 mt-1">{community.description}</p>

        <p className="text-sm text-gray-500 mt-2">
          {community.members?.length || 0} members
        </p>
      </div>
    </Link>
  );
}

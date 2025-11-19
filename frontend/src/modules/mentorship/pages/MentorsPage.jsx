import { useEffect, useState } from "react";
import api from "../../../services/apiClient";
import MentorCard from "../components/MentorCard";

export default function MentorsPage() {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    api.get("/mentorship").then((res) => {
      setMentors(res.data.data);
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-5">
      <h1 className="text-2xl font-bold">Find a Mentor</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mentors.map((mentor) => (
          <MentorCard key={mentor._id} mentor={mentor} />
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import api from "../../../services/apiClient";
import MentorCard from "../components/MentorCard";
import MentorFilters from "../components/MentorFilters";

export default function MentorsPage() {
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);

  const [filters, setFilters] = useState({
    role: "",
    skill: "",
    company: ""
  });

  const loadMentors = () => {
    api.get("/mentorship").then((res) => {
      setMentors(res.data.data);
      setFilteredMentors(res.data.data);
    });
  };

  useEffect(() => {
    loadMentors();
  }, []);

  // APPLY FILTERS
  useEffect(() => {
    let data = [...mentors];

    if (filters.role) {
      data = data.filter((m) => m.role === filters.role);
    }

    if (filters.skill) {
      data = data.filter((m) =>
        m.skills?.some((s) =>
          s.toLowerCase().includes(filters.skill.toLowerCase())
        )
      );
    }

    if (filters.company) {
      data = data.filter((m) =>
        m.company?.toLowerCase().includes(filters.company.toLowerCase())
      );
    }

    setFilteredMentors(data);
  }, [filters, mentors]);

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">

      <h1 className="text-2xl font-bold">Find a Mentor</h1>

      {/* 🔥 Filters Component */}
      <MentorFilters filters={filters} setFilters={setFilters} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMentors.map((mentor) => (
          <MentorCard key={mentor._id} mentor={mentor} />
        ))}
      </div>

      {filteredMentors.length === 0 && (
        <p className="text-center text-gray-600">No mentors found.</p>
      )}
    </div>
  );
}

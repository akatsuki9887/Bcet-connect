import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/apiClient";
import { useAuth } from "../../../context/AuthContext";

export default function JobCreatePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Agar user student hai → restrict
  if (user?.role === "student") {
    return (
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-gray-600">
          Only alumni, faculty, or admin can post jobs.
        </p>
      </div>
    );
  }

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    employmentType: "Full-Time",
    description: "",
    skills: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // skills string ko array me convert karo
      const payload = {
        ...form,
        skills: form.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      await api.post("/jobs", payload);

      alert("Job posted successfully ✅");
      navigate("/jobs");
    } catch (err) {
      console.error(err);
      alert("Failed to post job. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Post a New Job</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Job Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. Software Engineer Intern"
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium mb-1">Company</label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. Google, TCS, Infosys"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. Bangalore / Remote"
          />
        </div>

        {/* Employment Type */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Employment Type
          </label>
          <select
            name="employmentType"
            value={form.employmentType}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option>Full-Time</option>
            <option>Internship</option>
            <option>Part-Time</option>
            <option>Remote</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={5}
            className="w-full border rounded px-3 py-2"
            placeholder="Describe the role, responsibilities, and requirements..."
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Required Skills (comma separated)
          </label>
          <input
            type="text"
            name="skills"
            value={form.skills}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. React, Node.js, MongoDB"
          />
          <p className="text-xs text-gray-500 mt-1">
            Example: <code>React, Node.js, MongoDB</code>
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}

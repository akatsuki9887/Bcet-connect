import { useState } from "react";
import api from "../../../services/apiClient";
import { useAuth } from "../../../context/AuthContext";

export default function EventCreatePage() {
  const { user } = useAuth();

  // Restrict student access
  if (user?.role === "student") {
    return <h2 className="text-red-600">Access Denied: Only Alumni/Faculty Can Create Events</h2>;
  }

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "general",
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/events", eventData);
    alert("Event Created Successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4 bg-white shadow rounded">
      <h1 className="text-2xl font-bold">Create New Event</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Event Title"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Event Description"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <div className="flex gap-3">
          <input
            name="date"
            type="date"
            className="border p-2 rounded"
            onChange={handleChange}
          />
          <input
            name="time"
            type="time"
            className="border p-2 rounded"
            onChange={handleChange}
          />
        </div>

        <input
          name="location"
          placeholder="Location"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <select
          name="category"
          className="border p-2 rounded"
          onChange={handleChange}
        >
          <option value="general">General</option>
          <option value="tech">Tech</option>
          <option value="sports">Sports</option>
          <option value="cultural">Cultural</option>
          <option value="community">Community</option>
        </select>

        <button className="w-full bg-blue-600 text-white p-3 rounded">
          Create Event
        </button>
      </form>
    </div>
  );
}

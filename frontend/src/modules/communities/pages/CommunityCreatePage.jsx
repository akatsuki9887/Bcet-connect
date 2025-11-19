import { useState } from "react";
import api from "../../../services/apiClient";

export default function CommunityCreatePage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    banner: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await api.post("/communities", form);
      alert("Community Created Successfully!");
      console.log(res.data);
    } catch (err) {
      alert("Failed to create community!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Create Community</h1>

      <input
        name="name"
        placeholder="Community Name"
        className="border w-full p-2 rounded"
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Short Description"
        className="border w-full p-2 rounded"
        onChange={handleChange}
      />

      <input
        name="banner"
        placeholder="Banner Image URL"
        className="border w-full p-2 rounded"
        onChange={handleChange}
      />

      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleSubmit}
      >
        Create
      </button>
    </div>
  );
}

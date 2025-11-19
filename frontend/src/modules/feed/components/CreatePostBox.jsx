import { useState } from "react";
import api from "../../../services/apiClient";

export default function CreatePostBox({ onPostCreated }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!text.trim()) return alert("Write something!");

    setLoading(true);
    try {
      await api.post("/feed", { text });
      setText("");
      onPostCreated();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded bg-white shadow">
      <textarea
        placeholder="Share something..."
        className="w-full p-2 border rounded resize-none"
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handlePost}
        disabled={loading}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </div>
  );
}

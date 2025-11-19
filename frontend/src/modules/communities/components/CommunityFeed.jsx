import { useState } from "react";
import api from "../../../services/apiClient";

export default function CommunityFeed({ community, reload }) {
  const [text, setText] = useState("");

  const handlePost = async () => {
    if (!text.trim()) return alert("Write something!");

    await api.post(`/communities/${community._id}/post`, {
      channel: "general",
      text,
    });

    setText("");
    reload();
  };

  return (
    <div className="flex-1 space-y-4">
      <h1 className="text-2xl font-bold">{community.name}</h1>

      {/* New post textarea */}
      <div className="p-4 bg-white border rounded">
        <textarea
          placeholder="Share something to the community..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          onClick={handlePost}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Post
        </button>
      </div>

      {/* Posts Display */}
      {community.posts?.map((post) => (
        <div key={post._id} className="p-4 bg-white border rounded shadow">
          <p className="font-semibold text-blue-700">{post.user?.name}</p>
          <p className="mt-1">{post.text}</p>
        </div>
      ))}
    </div>
  );
}

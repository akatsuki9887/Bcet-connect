import { useState } from "react";
import api from "../../../services/apiClient";

export default function ChatWindow({ messages, reload, mentorId }) {
  const [text, setText] = useState("");

  const sendMessage = async () => {
    if (!text.trim()) return;

    await api.post(`/mentorship/chat/${mentorId}`, { text });
    setText("");
    reload();
  };

  return (
    <div className="space-y-4">

      {/* CHAT MESSAGES */}
      <div className="h-80 overflow-y-auto border p-3 rounded bg-white shadow space-y-3">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`p-2 rounded ${
              msg.sender?._id === mentorId
                ? "bg-gray-200 text-black"
                : "bg-blue-500 text-white"
            }`}
          >
            <p className="text-sm font-semibold">{msg.sender?.name}</p>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      {/* INPUT BOX */}
      <div className="flex gap-3">
        <input
          className="flex-1 border p-2 rounded"
          placeholder="Type message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../services/apiClient";
import ChatWindow from "../components/ChatWindow";

export default function MentorshipChatPage() {
  const { id } = useParams(); // mentorId
  const [messages, setMessages] = useState([]);
  const [mentor, setMentor] = useState(null);

  const loadChat = () => {
    api.get(`/mentorship/chat/${id}`).then((res) => {
      setMessages(res.data.data);
    });

    api.get(`/mentorship/${id}`).then((res) => {
      setMentor(res.data.data);
    });
  };

  useEffect(() => {
    loadChat();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto p-5 space-y-4">
      <h1 className="text-2xl font-bold">Chat with {mentor?.name}</h1>

      <ChatWindow messages={messages} reload={loadChat} mentorId={id} />
    </div>
  );
}

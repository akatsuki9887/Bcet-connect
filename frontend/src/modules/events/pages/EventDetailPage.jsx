import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/apiClient";

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    api.get(`/events/${id}`).then((res) => {
      setEvent(res.data.data);
    });
  }, [id]);

  if (!event) return <p>Loading...</p>;

  const handleRegister = () => {
    api.post(`/events/${id}/register`);
    alert("Registered for event!");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 p-4">
      {event.banner && (
        <img src={event.banner} className="w-full h-60 rounded object-cover" />
      )}

      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p className="text-gray-700">{event.description}</p>

      <div className="text-sm mt-3 text-gray-500">
        {event.date} • {event.time}
      </div>

      <p className="text-gray-600 mt-2">{event.location}</p>

      <button
        onClick={handleRegister}
        className="mt-4 px-5 py-2 bg-blue-600 text-white rounded"
      >
        Register Now
      </button>
    </div>
  );
}

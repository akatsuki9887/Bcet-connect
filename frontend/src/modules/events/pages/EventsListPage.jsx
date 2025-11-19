import { useEffect, useState } from "react";
import api from "../../../services/apiClient";
import EventCard from "../components/EventCard";

export default function EventsListPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/events").then((res) => {
      setEvents(res.data.data);
    });
  }, []);

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>

      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}

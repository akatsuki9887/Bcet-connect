import { useEffect, useState } from "react";
import api from "../../../services/apiClient";

export default function UpcomingEventsWidget() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/events").then((res) => {
      setEvents(res.data.data.slice(0, 3)); // show only 3
    });
  }, []);

  return (
    <div className="p-4 border rounded bg-white shadow">
      <h3 className="font-bold mb-2">Upcoming Events</h3>

      {events.map((e) => (
        <div key={e._id} className="mb-3">
          <p className="font-semibold">{e.title}</p>
          <p className="text-xs text-gray-600">{e.date}</p>
        </div>
      ))}
    </div>
  );
}

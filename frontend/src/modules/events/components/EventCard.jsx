import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <Link to={`/events/${event._id}`}>
      <div className="p-4 border rounded bg-white shadow hover:shadow-lg transition">
        {event.banner && (
          <img src={event.banner} className="w-full h-40 object-cover rounded" />
        )}

        <h2 className="text-xl font-bold mt-3">{event.title}</h2>
        <p className="text-gray-600">{event.location}</p>

        <div className="text-sm text-gray-500 mt-2">
          {event.date} • {event.time}
        </div>
      </div>
    </Link>
  );
}

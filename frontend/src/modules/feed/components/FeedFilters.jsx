export default function FeedFilters({ onFilter }) {
  const filters = ["all", "general", "jobs", "events", "resource"];

  return (
    <div className="flex gap-3 text-sm justify-center">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onFilter(f)}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          {f.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

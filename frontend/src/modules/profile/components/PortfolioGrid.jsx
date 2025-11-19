export default function PortfolioGrid({ items = [] }) {
  return (
    <div className="p-4 border rounded bg-white shadow">
      <h3 className="font-semibold mb-3">Portfolio</h3>

      <div className="grid grid-cols-3 gap-4">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="border p-3 rounded shadow">
              {item.image && (
                <img
                  src={item.image}
                  className="w-full h-32 object-cover rounded"
                  alt="project"
                />
              )}
              <h4 className="font-bold mt-2">{item.title}</h4>

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  className="text-blue-600 text-sm underline"
                >
                  View Project
                </a>
              )}

              {item.description && (
                <p className="text-sm mt-1">{item.description}</p>
              )}
            </div>
          ))
        ) : (
          <p>No portfolio items added</p>
        )}
      </div>
    </div>
  );
}

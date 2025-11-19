export default function ChannelSidebar({ channels }) {
  return (
    <aside className="w-64 p-4 bg-white border rounded shadow">
      <h3 className="font-bold mb-3">Channels</h3>

      {channels.map((ch, index) => (
        <div
          key={index}
          className="p-2 border-b text-gray-700 cursor-pointer hover:bg-gray-100"
        >
          #{ch.name}
        </div>
      ))}
    </aside>
  );
}

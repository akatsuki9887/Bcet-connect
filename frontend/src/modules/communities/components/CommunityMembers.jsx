export default function CommunityMembers({ members }) {
  return (
    <aside className="w-64 p-4 bg-white border rounded shadow">
      <h3 className="font-bold mb-3">Members</h3>

      {members.map((m) => (
        <div key={m._id} className="border-b p-2">
          <p className="font-semibold">{m.name}</p>
          <p className="text-sm text-gray-500 capitalize">{m.role}</p>
        </div>
      ))}
    </aside>
  );
}

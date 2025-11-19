import api from "../../../services/apiClient";
import { useAuth } from "../../../context/AuthContext";

export default function PostCard({ post, onDelete }) {
  const { user } = useAuth();

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this post?");
    if (!confirmDelete) return;

    await api.delete(`/feed/${post._id}`);
    onDelete();
  };

  return (
    <div className="p-4 border rounded bg-white shadow">
      {/* PROFILE INFO */}
      <div className="flex items-center gap-3">
        <img
          src={post.postedBy.avatar || "/default-avatar.png"}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-semibold">{post.postedBy.name}</p>
          <p className="text-xs text-gray-500">{post.postedBy.role}</p>
        </div>
      </div>

      {/* POST TEXT */}
      <p className="mt-3">{post.text}</p>

      {/* MEDIA */}
      {post.media?.map((m, i) => (
        <div key={i}>
          {m.type === "image" && (
            <img src={m.url} className="mt-3 rounded" />
          )}

          {m.type === "video" && (
            <video controls className="mt-3 rounded">
              <source src={m.url} />
            </video>
          )}
        </div>
      ))}

      {/* DELETE ONLY IF USER IS OWNER */}
      {(user?._id === post.postedBy._id || user?.role === "admin") && (
        <button
          onClick={handleDelete}
          className="mt-4 text-red-600 text-sm"
        >
          Delete
        </button>
      )}
    </div>
  );
}

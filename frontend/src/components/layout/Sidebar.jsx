import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  const menuItems = [
    { path: "/feed", label: "Feed" },
    { path: "/profile", label: "My Profile" },
    { path: "/jobs", label: "Jobs" },
    { path: "/events", label: "Events" },
    { path: "/communities", label: "Communities" },
    { path: "/mentorship", label: "Mentorship" },
    { path: "/learning", label: "Learning Hub" },
  ];

  const adminItems = [
    { path: "/admin/users", label: "User Management" },
    { path: "/admin/jobs", label: "Jobs Approval" },
    { path: "/admin/analytics", label: "Analytics Dashboard" },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside className="w-64 min-h-screen bg-blue-900 text-white p-5 shadow-lg">
      {/* BRAND */}
      <h2 className="font-bold text-2xl mb-8 tracking-wide">BCET CONNECT</h2>

      {/* USER INFO */}
      {user && (
        <div className="mb-6">
          <p className="font-semibold">{user.name}</p>
          <p className="text-gray-300 text-sm capitalize">{user.role}</p>
        </div>
      )}

      {/* MAIN MENU */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-2 rounded-md text-sm transition 
              ${
                isActive(item.path)
                  ? "bg-blue-700 font-semibold"
                  : "hover:bg-blue-800"
              }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* ADMIN MENU */}
      {user?.role === "admin" && (
        <>
          <h3 className="text-xs uppercase text-gray-400 mt-8 mb-2">
            Admin Panel
          </h3>

          <nav className="space-y-2">
            {adminItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-2 rounded-md text-sm transition 
                ${
                  isActive(item.path)
                    ? "bg-orange-700 font-semibold"
                    : "hover:bg-orange-800"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </>
      )}
    </aside>
  );
}

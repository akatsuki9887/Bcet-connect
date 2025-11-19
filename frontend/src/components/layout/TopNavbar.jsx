import { useAuth } from "../../context/AuthContext";

export default function TopNavbar() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white shadow">
      <h1 className="font-semibold">Dashboard</h1>
      <div className="flex items-center gap-3">
        {user && <span className="text-sm">Hi, {user.name}</span>}
        <button
          onClick={logout}
          className="text-sm bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

// frontend/src/layouts/AuthLayout.jsx
export default function AuthLayout({ children }) {
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <div>{children}</div>
    </div>
  );
}

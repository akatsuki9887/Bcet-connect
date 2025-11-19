import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../../../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate(); // <---- Add this

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const email = data.get("email");
    const password = data.get("password");

    try {
      await login(email, password);
      navigate("/dashboard"); // <---- Redirect here!
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <AuthForm
      title="Login"
      onSubmit={handleLogin}
      fields={[
        { name: "email", type: "email", placeholder: "Enter email" },
        { name: "password", type: "password", placeholder: "Enter password" },
      ]}
    />
  );
}

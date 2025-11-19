import AuthForm from "../components/AuthForm";
import api from "../../../services/apiClient";

export default function RegisterPage() {
  const handleRegister = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        role: "student", // later role select dropdown se bhi le sakte ho
      });

      alert("Registered successfully! Now login.");
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          "Registration failed, maybe email already used"
      );
    }
  };

  return (
    <AuthForm
      title="Register"
      onSubmit={handleRegister}
      fields={[
        { name: "name", type: "text", placeholder: "Your name" },
        { name: "email", type: "email", placeholder: "Email" },
        { name: "password", type: "password", placeholder: "Password" },
      ]}
    />
  );
}

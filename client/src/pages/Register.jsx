import { useState } from "react";
import { registerUser } from "../services/authServices";
import { useNavigate, Link } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await registerUser(form);

      console.log("REGISTER SUCCESS:", res.data);

      alert("Registered successfully");
      navigate("/login");
    } catch (error) {
      console.log("REGISTER ERROR:", error);

      if (error.response) {
        console.log("Server Response:", error.response.data);
        console.log("Status Code:", error.response.status);
      } else if (error.request) {
        console.log("No response from server:", error.request);
      } else {
        console.log("Request error:", error.message);
      }

      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded w-96 space-y-4"
      >
        <h2 className="text-white text-xl font-bold text-center">Register</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 rounded bg-slate-700 text-white"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-slate-700 text-white"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-slate-700 text-white"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 p-2 rounded text-white cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading && (
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          )}
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-sm text-gray-400 text-center">
          Already have account?{" "}
          <Link to="/login" className="text-blue-400 cursor-pointer">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

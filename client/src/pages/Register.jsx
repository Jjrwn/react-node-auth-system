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
          className="w-full bg-blue-600 p-2 rounded text-white cursor-pointer"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-t-white rounded-full animate-spin"></span>
          ) : (
            <>Register</>
          )}
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

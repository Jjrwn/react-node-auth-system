import { useState } from "react";
import { loginUser } from "../services/authServices";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginUser(form);

      console.log("LOGIN SUCCESS:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);

      navigate("/home");
    } catch (error) {
      console.log("LOGIN ERROR:", error);

      if (error.response) {
        console.log("Server Response:", error.response.data);
        console.log("Status Code:", error.response.status);
        console.log("Headers:", error.response.headers);
      } else if (error.request) {
        console.log("No response from server:", error.request);
      } else {
        console.log("Request setup error:", error.message);
      }

      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded w-96 space-y-4"
      >
        <h2 className="text-white text-xl font-bold text-center">Login</h2>

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

        <button className="w-full bg-green-600 p-2 rounded text-white cursor-pointer">
          Login
        </button>

        <p className="text-sm text-gray-400 text-center">
          No account?{" "}
          <Link to="/register" className="text-blue-400 cursor-pointer">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="text-3xl font-bold">Welcome, {username}</h1>

      <button onClick={logout} className="mt-6 bg-red-600 px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
};

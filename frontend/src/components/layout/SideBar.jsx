import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };


  return (
    <div className="w-64 min-h-screen bg-linear-to-br from-green-600 via-green-700 to-green-700 transition-shadow text-white p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-10">Dashboard</h1>

      <nav className="flex flex-col gap-4 flex-1">
        <button className="text-left">Dashboard</button>
        <button className="text-left">Tasks</button>

        <button
          onClick={handleLogout}
          className="mt-auto text-left hover:underline"
        >
          Logout
        </button>
      </nav>

    </div>
  );
};

export default Sidebar;
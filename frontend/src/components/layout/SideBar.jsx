import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarClock,
  AlertTriangle,
  User,
  LogOut,
  Menu,
} from "lucide-react";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div
      className={`${collapsed ? "w-18" : "w-72"} min-h-screen bg-red-500 text-white transition-all duration-300 flex flex-col`}
    >
      <div className="flex items-center justify-between p-4 mb-10">
        {!collapsed && (
          <h1 className="text-2xl font-extrabold ">
            <span className="text-green-500">To</span>Do
          </h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/20"
        >
          <Menu size={22} />
        </button>
      </div>

      <nav className="flex flex-col gap-4 mt-6 px-2 flex-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center ${
              collapsed ? "justify-center" : "gap-3"
            } p-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/20 ${isActive ? "bg-white/20 backdrop-blur-md" : ""}`
          }
        >
          <LayoutDashboard size={20} />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink
          to="/upcoming"
          className={({ isActive }) =>
            `flex items-center ${
              collapsed ? "justify-center" : "gap-3"
            } p-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/20 ${isActive ? "bg-white/20 backdrop-blur-md" : ""}`
          }
        >
          <CalendarClock size={20} />
          {!collapsed && <span>Upcoming</span>}
        </NavLink>

        <NavLink
          to="/overdue"
          className={({ isActive }) =>
            `flex items-center ${
              collapsed ? "justify-center" : "gap-3"
            } p-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/20 ${isActive ? "bg-white/20 backdrop-blur-md" : ""}`
          }
        >
          <AlertTriangle size={20} />
          {!collapsed && <span>Overdue</span>}
        </NavLink>

        {/* <button onClick={() => navigate("/profile")} className="text-left">
          Profile
        </button> */}
        <button
          onClick={handleLogout}
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          } p-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/20 mt-auto`}
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;

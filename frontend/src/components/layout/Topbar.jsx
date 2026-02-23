import { useLocation } from "react-router-dom";

const Topbar = () => {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/upcoming":
        return "Upcoming Tasks";
      case "/overdue":
        return "Overdue Tasks";
      case "/profile":
        return "Profile";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="h-16 bg-white shadow flex items-center px-6">
      <h2 className="text-xl font-semibold">{getTitle()}</h2>
    </div>
  );
};

export default Topbar;
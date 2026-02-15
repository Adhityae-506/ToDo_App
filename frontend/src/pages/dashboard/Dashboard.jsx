// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import MenuBar from "../dashboard/MenuBar";

// const Dashboard = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//       {/* <h1 className="text-3xl font-bold mb-4">
//         Welcome, {user?.name} 👋
//       </h1> */}

//       <div className="w-full max-w-7xl h-[92vh] bg-white rounded-3xl shadow-2xl flex overflow-hidden">
//         <MenuBar />
//       </div>

//       <button
//         onClick={handleLogout}
//         className="bg-black text-white px-4 py-2 rounded-lg"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Dashboard;

import DashboardLayout from "../../components/layout/DashboardLayout";
import TaskInput from "../../components/tasks/TaskInput";
import TaskList from "../../components/tasks/TaskList";
import Header from "../../components/layout/Header";

const Dashboard = () => {
  return (
    <DashboardLayout>

      {/* Page Header */}
      <Header title="Today" />

      {/* Task Creator */}
      <div className="mt-6">
        <TaskInput />
      </div>

      {/* Task Sections (Today / Pending / Upcoming) */}
      <div className="mt-6">
        <TaskList />
      </div>

    </DashboardLayout>
  );
};

export default Dashboard;

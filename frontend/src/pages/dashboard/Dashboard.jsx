import DashboardLayout from "./DashboardLayout";
import { useTask } from "../../context/TaskContext";

const Dashboard = () => {
  const { tasks,toggleTask, deleteTask } = useTask();
  return <DashboardLayout />;
};

export default Dashboard;

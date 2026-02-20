import DashboardLayout from "./DashboardLayout";
import { useTask } from "../../context/TaskContext";

const Dashboard = () => {
  const { tasks,toggleTask, deleteTask } = useTask();
  // const [title, setTitle] = useState("");
  // const [date, setDate] = useState("");
  return <DashboardLayout />;
};

export default Dashboard;

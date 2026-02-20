import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import API from "../api/axios";

const TaskContext = createContext();

export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    } finally {
      setLoading(false);
    }
  };

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const addTask = async (task) => {
    try {
      await API.post("/tasks", task);
      fetchTasks();
    } catch {
      console.error("Failed to add task", err);
    }
  };

  const toggleTask = async (id) => {
    try {
      await API.patch(`/tasks/${id}/toggle`);
      fetchTasks();
    } catch (err) {
      console.error("Toggle failed", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, fetchTasks, addTask, toggleTask, deleteTask, loading }}
    >
      {children}
    </TaskContext.Provider>
  );
};

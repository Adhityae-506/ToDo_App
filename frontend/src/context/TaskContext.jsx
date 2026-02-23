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

  const { user } = useAuth();

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

  useEffect(() => {
    if (user) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [user]);

  const addTask = async (task) => {
    try {
      const res = await API.post("/tasks", task);

      // Instantly update state (no refetch)
      setTasks((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Failed to add task", err);
    }
  };

  const toggleTask = async (id) => {
    try {
      const res = await API.patch(`/tasks/${id}/toggle`);

      // Update only that task in state
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? res.data : task
        )
      );
    } catch (err) {
      console.error("Toggle failed", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);

      // Remove from state instantly
      setTasks((prev) =>
        prev.filter((task) => task.id !== id)
      );
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

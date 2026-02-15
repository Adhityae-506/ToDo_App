import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ➕ Add task
  const addTask = (task) => {
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        status: "pending",
        createdAt: new Date().toISOString(),
      },
    ]);
  };


  const completeTask = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: "completed" } : t
      )
    );
  };

  // ❌ Delete task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, completeTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

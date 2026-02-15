import { useState } from "react";
import { useTasks } from "../../context/TaskContext";

const TaskInput = () => {
  const { addTask } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !dueDate) return;

    addTask({ title, description, dueDate });

    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow space-y-3"
    >
      <input
        className="w-full border p-2 rounded"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full border p-2 rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="date"
        className="border p-2 rounded mr-2"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
  );
};

export default TaskInput;

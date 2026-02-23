import SideBar from "../../components/layout/SideBar";
import Topbar from "../../components/layout/Topbar";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTask } from "../../context/TaskContext";


const Dashboard = () => {
  const { user } = useAuth();
  const { tasks, toggleTask, deleteTask, addTask, loading } = useTask();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const today = new Date().toLocaleDateString("en-CA");
  
  const todayTasks = tasks.filter(
    (t) => t.taskDate === today
  );

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  const handleAddTask = async () => {
    if (!title.trim() || !date) return;

    await addTask({ title: title.trim(), taskDate: date });

    setTitle("");
    setDate("");
  };

  return (
    <div className="flex">
      <SideBar />

      <div className="flex-1 flex flex-col bg-gray-100 min-h-screen">
        <Topbar />

        <div className="p-6 space-y-6">
          
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome back, <span className="text-green-500">{user?.name}</span>
            </h1>
            <p>Nice to see you today.</p>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-sm text-gray-500">Total Tasks</p>
              <h2 className="text-2xl font-bold mt-2 text-black">{total}</h2>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-sm text-gray-500">Completed</p>
              <h2 className="text-2xl font-bold mt-2 text-green-700">
                {completed}
              </h2>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-sm text-gray-500">Pending</p>
              <h2 className="text-2xl font-bold mt-2 text-red-700">
                {pending}
              </h2>
            </div>
          </div>

          
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Add New Task
            </h2>

            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Enter task title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />

              <button
                onClick={handleAddTask}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Add
              </button>
            </div>
          </div>

            
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Today’s Tasks
            </h2>

            {loading ? (
              <div className="space-y-4 animate-pulse">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-gray-300 rounded" />
                      <div className="h-4 w-40 bg-gray-300 rounded" />
                    </div>
                    <div className="h-4 w-20 bg-gray-300 rounded" />
                  </div>
                ))}
              </div>
            ) : todayTasks.length === 0 ? (
              <div className="flex flex-col items-center py-10 text-center">
                <p className="text-gray-500">No tasks for today.</p>
                <p className="text-sm text-gray-400 mt-1">
                  Tasks executed successfully! Time to recharge. 
                </p>
              </div>
            ) : (
              todayTasks.map((task, index) => (
                <div
                  key={task.id}
                  className={`flex items-center justify-between py-3 ${
                    index !== tasks.length - 1 ? "border-b" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="w-4 h-4"
                    />
                    <span
                      className={
                        task.completed
                          ? "text-gray-400 line-through"
                          : "text-gray-800"
                      }
                    >
                      {task.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="text-sm text-gray-500">
                      {task.taskDate}
                    </span>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-sm text-red-500 hover:underline font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
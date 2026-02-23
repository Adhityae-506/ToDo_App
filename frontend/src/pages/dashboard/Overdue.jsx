import Sidebar from "../../components/layout/SideBar";
import Topbar from "../../components/layout/Topbar";
import { useTask } from "../../context/TaskContext";

const Overdue = () => {
  const { tasks, toggleTask, deleteTask, loading } = useTask();

  const today = new Date().toLocaleDateString("en-CA");

  const overdueTasks = tasks.filter((t) => t.taskDate < today);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Topbar />

        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 text-red-500">Overdue Tasks</h2>

          {loading ? (
            <p>Loading...</p>
          ) : overdueTasks.length === 0 ? (
            <p>No overdue tasks.</p>
          ) : (
            overdueTasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between py-3 border-b border-red-300"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
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

                <div className="flex gap-4">
                  <span>{task.taskDate}</span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500"
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
  );
};

export default Overdue;

import { useTasks } from "../../context/TaskContext";
import { isToday, isPast, isFuture } from "../../utils/dataHelpers";

const TaskList = () => {
  const { tasks, completeTask } = useTasks();

  const todayTasks = tasks.filter(
    (t) => isToday(t.dueDate) && t.status === "pending"
  );

  const pendingTasks = tasks.filter(
    (t) => isPast(t.dueDate) && t.status === "pending"
  );

  const upcomingTasks = tasks.filter(
    (t) => isFuture(t.dueDate) && t.status === "pending"
  );

  const renderTask = (task) => (
    <div
      key={task.id}
      className="flex justify-between items-center bg-white p-3 rounded shadow"
    >
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          onChange={() => completeTask(task.id)}
        />
        <span>{task.title}</span>
      </label>
    </div>
  );

  return (
    <div className="space-y-6">

      <section>
        <h2 className="text-xl font-semibold">
          Today</h2>
        {todayTasks.map(renderTask)}
      </section>

      <section>
        <h2 className="text-xl font-semibold text-amber-600">
          Pending
        </h2>
        {pendingTasks.map(renderTask)}
      </section>

      <section>
        <h2 className="text-xl font-semibold text-indigo-600">
          Upcoming
        </h2>
        {upcomingTasks.map(renderTask)}
      </section>
    </div>
  );
};

export default TaskList;

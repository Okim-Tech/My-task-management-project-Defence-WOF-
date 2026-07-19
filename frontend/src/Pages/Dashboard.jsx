import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/dashboard/Navbar";
import SummaryCard from "../Components/dashboard/SummaryCard";
import TaskCard from "../Components/dashboard/TaskCard";
import TaskModal from "../Components/dashboard/TaskModal";
import { getTasks } from "../Services/taskService";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const data = await getTasks(token);
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    fetchTasks();
  }, [navigate, token]);

  return (
    <div className="dashboard-container">
      <Navbar />

      <button
        className="add-task-btn"
        onClick={() => {
          setSelectedTask(null);
          setIsModalOpen(true);
        }}
      >
        + Add New Task
      </button>

      <div className="summary-cards">
        <SummaryCard
          title="Pending"
          count={tasks.filter((task) => task.status === "Pending").length}
        />

        <SummaryCard
          title="In Progress"
          count={tasks.filter((task) => task.status === "In Progress").length}
        />

        <SummaryCard
          title="Completed"
          count={tasks.filter((task) => task.status === "Completed").length}
        />
      </div>

      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              token={token}
              onDelete={() => fetchTasks()}
              onEdit={() => {
                setSelectedTask(task);
                setIsModalOpen(true);
              }}
            />
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </div>

      {isModalOpen && (
        <TaskModal
          token={token}
          task={selectedTask}
          refreshTasks={fetchTasks}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
}

export default Dashboard;

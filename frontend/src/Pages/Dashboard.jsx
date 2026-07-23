import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/dashboard/Navbar";
import SummaryCard from "../Components/dashboard/SummaryCard";
import TaskCard from "../Components/dashboard/TaskCard";
import TaskModal from "../Components/dashboard/TaskModal";
import EmptyState from "../Components/dashboard/EmptyState";
import TaskPieChart from "../Components/dashboard/TaskPieChart";
import TaskBarChart from "../Components/dashboard/TaskBarChart";
import { getTasks } from "../Services/taskService";
import { Plus, Search } from "lucide-react";
import { motion } from "framer-motion";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Search, Filter & Sort State
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  // STEP 1: Added sortBy State
  const [sortBy, setSortBy] = useState("nearest");

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

  // STEP 2: Filter & Sort Tasks Logic
  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch =
        (task.title || "").toLowerCase().includes(search.toLowerCase()) ||
        (task.subject || "").toLowerCase().includes(search.toLowerCase());

      const matchesStatus = filter === "All" || task.status === filter;

      const matchesPriority =
        filterPriority === "All" || task.priority === filterPriority;

      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "nearest":
          return new Date(a.dueDate || 0) - new Date(b.dueDate || 0);
        case "furthest":
          return new Date(b.dueDate || 0) - new Date(a.dueDate || 0);
        case "newest":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case "oldest":
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        default:
          return 0;
      }
    });

  // Analytics Calculations
  const totalTasks = tasks.length;
  const todayStr = new Date().toISOString().split("T")[0];

  const dueToday = tasks.filter((task) => {
    if (!task.dueDate) return false;
    return new Date(task.dueDate).toISOString().split("T")[0] === todayStr;
  }).length;

  const overdueTasks = tasks.filter((task) => {
    if (!task.dueDate || task.status === "Completed") return false;
    return new Date(task.dueDate) < new Date();
  }).length;

  const completedCount = tasks.filter(
    (task) => task.status === "Completed",
  ).length;
  const completionRate =
    totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return (
    <motion.div
      className="dashboard-container"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Navbar />

      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>My Tasks</h1>
          <p>Manage your daily activities and stay productive.</p>
        </div>

        <button className="add-task-btn" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} />
          Add New Task
        </button>
      </div>

      <div className="summary-cards">
        <SummaryCard
          title="Pending"
          count={tasks.filter((task) => task.status === "Pending").length}
        />

        <SummaryCard
          title="In Progress"
          count={tasks.filter((task) => task.status === "In Progress").length}
        />

        <SummaryCard title="Completed" count={completedCount} />
      </div>

      <motion.div
        className="analytics-grid"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <motion.div
          className="analytics-card"
          whileHover={{ y: -6, scale: 1.02 }}
        >
          <h4>Total Tasks</h4>
          <h2>{totalTasks}</h2>
        </motion.div>

        <motion.div
          className="analytics-card"
          whileHover={{ y: -6, scale: 1.02 }}
        >
          <h4>Due Today</h4>
          <h2>{dueToday}</h2>
        </motion.div>

        <motion.div
          className="analytics-card"
          whileHover={{ y: -6, scale: 1.02 }}
        >
          <h4>Overdue</h4>
          <h2>{overdueTasks}</h2>
        </motion.div>

        <motion.div
          className="analytics-card"
          whileHover={{ y: -6, scale: 1.02 }}
        >
          <h4>Completion Rate</h4>
          <h2>{completionRate}%</h2>

          <div className="analytics-progress">
            <div
              className="analytics-fill"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </motion.div>
      </motion.div>
      <div className="charts-section">
        <TaskPieChart tasks={tasks} />
        <TaskBarChart tasks={tasks} />
      </div>

      {/* Search, Filter & Sort Controls */}
      <div className="dashboard-tools">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by title or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        {/* Priority Filter */}
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        {/* STEP 3: Sort Dropdown */}
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="nearest">Nearest Due Date</option>
          <option value="furthest">Furthest Due Date</option>
          <option value="newest">Newest Created</option>
          <option value="oldest">Oldest Created</option>
        </select>
      </div>

      <div className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
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
          <EmptyState onAddTask={() => setIsModalOpen(true)} />
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
    </motion.div>
  );
}

export default Dashboard;

import {
  Pencil,
  Trash2,
  CalendarDays,
  Flag,
  Clock3,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { deleteTask } from "../../Services/taskService";
import "../../styles/taskCard.css";
import { toast } from "react-toastify";

function TaskCard({ task, token, onDelete, onEdit }) {
  const handleDelete = async () => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await deleteTask(task._id, token);
      onDelete(task._id);
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete task");
    }
  };

  const getStatusIcon = () => {
    switch (task.status) {
      case "Pending":
        return <Clock3 size={16} />;

      case "In Progress":
        return <LoaderCircle size={16} />;

      case "Completed":
        return <CheckCircle2 size={16} />;

      default:
        return <Clock3 size={16} />;
    }
  };

  return (
    <motion.div
      className={`task-card ${task.status.replace(/\s/g, "-").toLowerCase()}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      whileHover={{
        y: -6,
        scale: 1.01,
      }}
      whileTap={{
        scale: 0.98,
      }}
    >
      <div className="task-top">
        <div>
          <h3 className="task-title">{task.title}</h3>

          <span className="subject-badge">{task.subject}</span>
        </div>

        <span
          className={`status ${task.status.replace(/\s/g, "-").toLowerCase()}`}
        >
          {getStatusIcon()}
          {task.status}
        </span>
      </div>

      <p className="task-description">{task.description}</p>

      <div className="task-details">
        <div className="detail-item">
          <CalendarDays size={17} />
          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>

        <div className="detail-item">
          <Flag size={17} />
          <span className={`priority ${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button className="edit-btn" onClick={() => onEdit(task)}>
          <Pencil size={17} />
          Edit
        </button>

        <button className="delete-btn" onClick={handleDelete}>
          <Trash2 size={17} />
          Delete
        </button>
      </div>
    </motion.div>
  );
}

export default TaskCard;

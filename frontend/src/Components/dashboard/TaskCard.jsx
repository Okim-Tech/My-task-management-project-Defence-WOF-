import { deleteTask } from "../../Services/taskService";

function TaskCard({ task, token, onDelete, onEdit }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmDelete) return;

    try {
      await deleteTask(task._id, token);

      alert("Task deleted successfully!");

      onDelete(task._id);
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to delete task");
    }
  };

  return (
    <div className="task-card">
      <h3>{task.title}</h3>

      <p>
        <strong>Subject:</strong> {task.subject}
      </p>

      <p>{task.description}</p>

      <p>
        <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}
      </p>

      <span>{task.status}</span>

      <div className="task-actions">
        <button className="edit-btn" onClick={onEdit}>
          Edit
        </button>

        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;

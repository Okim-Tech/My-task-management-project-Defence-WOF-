import { useEffect, useState } from "react";
import { createTask, updateTask } from "../../Services/taskService";

function TaskModal({ onClose, token, task, refreshTasks }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        subject: task.subject || "",
        priority: task.priority || "Medium",
        status: task.status || "Pending",
        dueDate: task.dueDate ? task.dueDate.substring(0, 10) : "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        subject: "",
        priority: "Medium",
        status: "Pending",
        dueDate: "",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (task) {
        await updateTask(task._id, formData, token);
        alert("Task updated successfully!");
      } else {
        await createTask(formData, token);
        alert("Task created successfully!");
      }

      await refreshTasks();
      onClose();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{task ? "Edit Task" : "Add New Task"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Task Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <div className="form-group">
            <label>Due Date</label>

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Priority</label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="modal-buttons">
            <button type="submit" className="save-btn">
              {task ? "Update Task" : "Save Task"}
            </button>

            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;

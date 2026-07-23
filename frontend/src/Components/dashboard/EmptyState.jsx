import { ClipboardList } from "lucide-react";

function EmptyState({ onAddTask }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <ClipboardList size={70} />
      </div>

      <h2>No Tasks Yet</h2>

      <p>
        You haven't created any tasks yet.
        <br />
        Start organizing your academic work now.
      </p>

      <button className="empty-btn" onClick={onAddTask}>
        + Create Your First Task
      </button>
    </div>
  );
}

export default EmptyState;

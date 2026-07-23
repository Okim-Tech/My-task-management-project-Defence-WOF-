import { Clock3, LoaderCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

function SummaryCard({ title, count }) {
  let icon;
  let iconClass = "";

  switch (title) {
    case "Pending":
      icon = <Clock3 size={28} />;
      iconClass = "pending-icon";
      break;

    case "In Progress":
      icon = <LoaderCircle size={28} />;
      iconClass = "progress-icon";
      break;

    case "Completed":
      icon = <CheckCircle2 size={28} />;
      iconClass = "completed-icon";
      break;

    default:
      icon = <Clock3 size={28} />;
  }

  return (
    <motion.div
      className="summary-card"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
    >
      <div className="summary-top">
        <div>
          <h4>{title}</h4>
          <h1>{count}</h1>
        </div>

        <div className={`summary-icon ${iconClass}`}>{icon}</div>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${Math.min(count * 20, 100)}%`,
          }}
        ></div>
      </div>
    </motion.div>
  );
}

export default SummaryCard;

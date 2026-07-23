import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { motion } from "framer-motion";

function TaskBarChart({ tasks }) {
  const data = [
    {
      priority: "High",
      tasks: tasks.filter((task) => task.priority === "High").length,
    },
    {
      priority: "Medium",
      tasks: tasks.filter((task) => task.priority === "Medium").length,
    },
    {
      priority: "Low",
      tasks: tasks.filter((task) => task.priority === "Low").length,
    },
  ];

  return (
    <motion.div
      className="chart-card"
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      <h3>Task Priority Overview</h3>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="priority" />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Bar dataKey="tasks" fill="#4f46e5" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export default TaskBarChart;

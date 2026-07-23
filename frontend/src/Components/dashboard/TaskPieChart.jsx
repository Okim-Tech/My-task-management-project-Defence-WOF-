import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { motion } from "framer-motion";

function TaskPieChart({ tasks }) {
  const data = [
    {
      name: "Pending",
      value: tasks.filter((task) => task.status === "Pending").length,
    },
    {
      name: "In Progress",
      value: tasks.filter((task) => task.status === "In Progress").length,
    },
    {
      name: "Completed",
      value: tasks.filter((task) => task.status === "Completed").length,
    },
  ];

  const COLORS = ["#f59e0b", "#3b82f6", "#22c55e"];

  return (
    <motion.div
      className="chart-card"
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      <h3>Task Status Overview</h3>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            innerRadius={55}
            paddingAngle={4}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export default TaskPieChart;

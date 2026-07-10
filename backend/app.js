const express = require("express");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Student Task Management API");
});

module.exports = app;

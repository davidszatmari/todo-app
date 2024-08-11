const express = require("express");
const app = express();
const PORT = 3000;

let tasks = [];

app.use(express.json());

app.get("/api/tasks", (req, res) => {
  res.status(200).json;
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const { title } = req.body;
  if (title) {
    const newTask = { id: tasks.length + 1, title, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } else {
    res.status(400).json({ error: "Title is required" });
  }
});

app.put("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const task = tasks.find((t) => t.id == id);
  if (task) {
    task.completed = !task.completed;
    res.json(task);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex((t) => t.id == id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});

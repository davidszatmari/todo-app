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

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});

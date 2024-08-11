const express = require("express");
const app = express();
const PORT = 3000;

let tasks = [];

app.use(express.json());

app.get("/api/tasks", (req, res) => {
  res.status(200).json;
  res.json(tasks);
});

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});

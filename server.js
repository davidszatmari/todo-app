const express = require("express");
const app = express();
const PORT = 3000;

let tasks = [];

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});

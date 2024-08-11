const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

const fetchTasks = async () => {
  const res = await fetch("/api/tasks");
  const tasks = await res.json();
  taskList.innerHTML = "";
  tasks.forEach((task) => addTaskToDOM(task));
};

const addTaskToDOM = (task) => {
  const li = document.createElement("li");
  li.innerHTML = `
        <span style="text-decoration: ${
          task.completed ? "line-through" : "none"
        }">${task.title}</span>
        <div>
            <button class="toggle">${
              task.completed ? "Undo" : "Complete"
            }</button>
            <button class="delete">Delete</button>
        </div>
    `;

  li.querySelector(".toggle").addEventListener("click", () =>
    toggleTask(task.id)
  );
  li.querySelector(".delete").addEventListener("click", () =>
    deleteTask(task.id)
  );

  taskList.appendChild(li);
};

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = taskInput.value;
  if (title) {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const newTask = await res.json();
    addTaskToDOM(newTask);
    taskInput.value = "";
  }
});

const toggleTask = async (id) => {
  const res = await fetch(`/api/tasks/${id}`, { method: "PUT" });
  const updatedTask = await res.json();
  fetchTasks();
};

const deleteTask = async (id) => {
  await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  fetchTasks();
};

fetchTasks();

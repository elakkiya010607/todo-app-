let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = -1;

function addTask() {
  let input = document.getElementById("taskInput");
  let value = input.value.trim();

  if (value === "") return;

  if (editIndex === -1) {
    tasks.push(value);
  } else {
    tasks[editIndex] = value;
    editIndex = -1;
  }

  input.value = "";
  save();
  render();
}

function render() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    li.innerHTML = `
      <span>${task}</span>
      <div>
        <button class="editBtn" onclick="editTask(${index})">Edit</button>
        <button class="deleteBtn" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    list.appendChild(li);
  });
}

function deleteTask(index) {
  tasks.splice(index, 1);
  save();
  render();
}

function editTask(index) {
  document.getElementById("taskInput").value = tasks[index];
  editIndex = index;
}

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

render();
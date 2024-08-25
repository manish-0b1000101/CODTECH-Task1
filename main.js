const toDoInput = document.querySelector(".todo-input");
const toDoBtn = document.querySelector(".todo-btn");
const toDoList = document.querySelector(".todo-list");
const standardTheme = document.querySelector(".standard-theme");
const lightTheme = document.querySelector(".light-theme");
const darkerTheme = document.querySelector(".darker-theme");

let date = new Date();
document.getElementById("datetime").innerHTML = date.toLocaleString();

toDoBtn.addEventListener("click", addToDo);
toDoList.addEventListener("click", deletecheck);
document.addEventListener("DOMContentLoaded", getTodos);

function addToDo(event) {
  event.preventDefault();
  const toDoDiv = document.createElement("div");
  toDoDiv.classList.add("todo", `darker-todo`);

  const newToDo = document.createElement("li");
  if (toDoInput.value === "") {
    alert("Empty Task!");
  } else {
    // newToDo.innerText = "hey";
    newToDo.innerText = toDoInput.value;
    newToDo.classList.add("todo-item");
    toDoDiv.appendChild(newToDo);

    // Adding to local storage;
    savelocal(toDoInput.value);

    // check btn;
    const checked = document.createElement("button");
    checked.innerHTML = '<i class="fas fa-check"></i>';
    checked.classList.add("check-btn", `darker-button`);
    toDoDiv.appendChild(checked);
    // delete btn;
    const deleted = document.createElement("button");
    deleted.innerHTML = '<i class="fas fa-trash"></i>';
    deleted.classList.add("delete-btn", `darker-button`);
    toDoDiv.appendChild(deleted);

    // Append to list;
    toDoList.appendChild(toDoDiv);

    // CLearing the input;
    toDoInput.value = "";
  }
}

function deletecheck(event) {
  const item = event.target;

  // delete
  if (item.classList[0] === "delete-btn") {
    // item.parentElement.remove();
    // animation
    item.parentElement.classList.add("fall");

    //removing local todos;
    removeLocalTodos(item.parentElement);

    item.parentElement.addEventListener("transitionend", function () {
      item.parentElement.remove();
    });
  }

  // check
  if (item.classList[0] === "check-btn") {
    item.parentElement.classList.toggle("completed");
  }
}

// Saving to local storage:
function savelocal(todo) {
  //Check: if item/s are there;
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  //Check: if item/s are there;
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    // toDo DIV;
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo", `darker-todo`);

    // Create LI
    const newToDo = document.createElement("li");

    newToDo.innerText = todo;
    newToDo.classList.add("todo-item");
    toDoDiv.appendChild(newToDo);

    // check btn;
    const checked = document.createElement("button");
    checked.innerHTML = '<i class="fas fa-check"></i>';
    checked.classList.add("check-btn", `darker-button`);
    toDoDiv.appendChild(checked);
    // delete btn;
    const deleted = document.createElement("button");
    deleted.innerHTML = '<i class="fas fa-trash"></i>';
    deleted.classList.add("delete-btn", `darker-button`);
    toDoDiv.appendChild(deleted);

    // Append to list;
    toDoList.appendChild(toDoDiv);
  });
}

function removeLocalTodos(todo) {
  //Check: if item/s are there;
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todos.indexOf(todo.children[0].innerText);
  // console.log(todoIndex);
  todos.splice(todoIndex, 1);
  // console.log(todos);
  localStorage.setItem("todos", JSON.stringify(todos));
}

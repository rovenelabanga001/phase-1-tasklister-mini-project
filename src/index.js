document.addEventListener("DOMContentLoaded", () => {
  // your code here
  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    let textInput = document
      .querySelector("#new-task-description")
      .value.trim();
    let priorityInput = document.querySelector("#task-priority").value;
    if (textInput) {
      createToDoTask(textInput, priorityInput);
    } else {
      alert("Please enter task");
    }
  });

  document.querySelector("#sort-tasks").addEventListener("click", () => {
    sortTasks();
  });
});

function createToDoTask(activity, priority) {
  let li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      li.style.textDecoration = "line-through";
    } else {
      li.style.textDecoration = "none";
    }
  });

  li.appendChild(checkbox);

  let text = document.createTextNode(activity)

  li.appendChild(text);

  if (priority === "high") {
    li.style.color = "red";
  } else if (priority === "medium") {
    li.style.color = "green";
  } else {
    li.style.color = "grey";
  }

  const btn = document.createElement("button");
  btn.textContent = "delete";
  btn.addEventListener("click", btnOnclick);

  li.appendChild(btn);
  const ul = document.getElementById("tasks");
  ul.appendChild(li);
}

function btnOnclick(e) {
  e.target.parentNode.remove();
}

function sortTasks() {
  const list = document.getElementById("tasks");
  const items = Array.from(list.querySelectorAll("li"));

  //sort items based on priority
  items.sort((a, b) => {
    const priorityA = a.style.color;
    const priorityB = b.style.color;

    //Determine priority levels for sorting
    return priorityLevel(priorityA) - priorityLevel(priorityB);
  });

  //clear the list and append sorted items
  list.innerHTML = "";
  items.forEach((item) => list.appendChild(item));
}

function priorityLevel(color) {
  if (color === "red") return 1;
  if (color === "green") return 2;
  if (color === "grey") return 3;
  return 4;
}

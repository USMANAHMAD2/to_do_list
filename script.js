const inputBox = document.getElementById("input-box");
const taskList = document.getElementById("Tasks");
function addtask() {
  let taskText = inputBox.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }
  let taskDiv = document.createElement("div");
  taskDiv.className = "taskbg";

  let li = document.createElement("li");
  li.textContent = taskText;

  li.addEventListener("click", function () {
    li.classList.toggle("checked");
  });

  let actionsDiv = document.createElement("div");
  actionsDiv.className = "actions";

  let editBtn = document.createElement("img");
  editBtn.src = "Edit Pencil.png";
  editBtn.alt = "edit";
  editBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    let newText = prompt("Edit your task:", li.firstChild.textContent);
    if (newText && newText.trim() !== "") {
      li.firstChild.textContent = newText;
    }
  });

  let deleteBtn = document.createElement("img");
  deleteBtn.src = "Delete.png";
  deleteBtn.alt = "delete";
  deleteBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    taskDiv.remove();
  });

  let dateInput = document.createElement("input");
  dateInput.type = "datetime-local";
  dateInput.style.marginLeft = "20px";
  dateInput.addEventListener("change", () => {
    li.setAttribute("data-deadline", dateInput.value);
  });

  actionsDiv.appendChild(editBtn);
  actionsDiv.appendChild(deleteBtn);

  li.appendChild(actionsDiv);
  li.appendChild(dateInput);

  taskDiv.appendChild(li);
  taskList.appendChild(taskDiv);

  inputBox.value = "";
}

inputBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addtask();
  }
});

document.querySelector(".btns1").addEventListener("click", () => {
  document
    .querySelectorAll("#Tasks li")
    .forEach((li) => (li.parentElement.style.display = "block"));
});

document.querySelector(".btns2").addEventListener("click", () => {
  document.querySelectorAll("#Tasks li").forEach((li) => {
    li.parentElement.style.display = li.classList.contains("checked")
      ? "none"
      : "block";
  });
});

document.querySelector(".btns3").addEventListener("click", () => {
  document.querySelectorAll("#Tasks li").forEach((li) => {
    li.parentElement.style.display = li.classList.contains("checked")
      ? "block"
      : "none";
  });
});

document.querySelectorAll(".btns4")[1].addEventListener("click", () => {
  document
    .querySelectorAll("#Tasks li.checked")
    .forEach((li) => li.parentElement.remove());
});

setInterval(() => {
  document.querySelectorAll("#Tasks li").forEach((li) => {
    let deadline = li.getAttribute("data-deadline");
    if (deadline) {
      let deadlineTime = new Date(deadline);
      let now = new Date();
      if (now > deadlineTime && !li.classList.contains("checked")) {
        li.style.color = "red";
      }
    }
  });
}, 60000);

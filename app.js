//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

var taskInput = document.getElementById("new-task"); //Add a new task.
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTaskHolder = document.getElementById("incompleteTasks"); //ul of #incompleteTasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

//New task list item
var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");

  //input (checkbox)
  var checkBox = document.createElement("input"); //checkbx
  //label
  var label = document.createElement("label"); //label
  //input (text)
  var editInput = document.createElement("input"); //text
  //button.edit
  var editButton = document.createElement("button"); //edit button

  //button.delete
  var deleteButton = document.createElement("button"); //delete button
  var deleteButtonImg = document.createElement("img"); //delete button image

  label.innerText = taskString;
  label.className = "task";

  //Each elements, needs appending
  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

var addTask = function () {
  console.log("Add Task...");
  // Trim the input value to remove any leading or trailing whitespace
  var taskValue = taskInput.value.trim();
  if (!taskValue) return; // Prevent empty tasks

  // Create a new list item with the text from the #new-task:
  var listItem = createNewTaskElement(taskValue);

  // Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = ""; // Clear the input field
};
//Edit an existing task.

var editTask = function () {
  console.log("Edit Task...");

  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var editBtn = listItem.querySelector(".edit");
  var containsClass = listItem.classList.contains("editMode");

  if (containsClass) {
    // Switch to view mode
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    // Switch to edit mode
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  // Toggle .editMode on the parent
  listItem.classList.toggle("editMode");
};

//Delete task.
var deleteTask = function () {
  console.log("Delete Task...");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
};

//Mark task completed
var taskCompleted = function () {
  console.log("Complete Task...");

  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

  // Ensure the checkbox is checked
  var checkBox = listItem.querySelector("input[type=checkbox]");
  checkBox.checked = true;
};

var taskIncomplete = function () {
  console.log("Incomplete Task...");

  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  // Ensure the checkbox is unchecked
  var checkBox = listItem.querySelector("input[type=checkbox]");
  checkBox.checked = false;
};

var ajaxRequest = function () {
  console.log("AJAX Request");
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  // Select ListItems children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");

  // Bind editTask to edit button
  editButton.onclick = editTask;
  // Bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
  // Bind taskCompleted or taskIncomplete to checkBoxEventHandler
  checkBox.onchange = checkBoxEventHandler;
};

// Cycle over incompleteTaskHolder ul list items
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

// Cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");

  // Input (checkbox)
  var checkBox = document.createElement("input"); // checkbox
  checkBox.type = "checkbox";
  checkBox.setAttribute("aria-label", "Mark task as complete");

  // Label
  var label = document.createElement("label"); // label
  label.innerText = taskString;
  label.className = "task";

  // Input (text)
  var editInput = document.createElement("input"); // text
  editInput.type = "text";
  editInput.className = "task";
  editInput.setAttribute("aria-label", "Edit task");

  // Button.edit
  var editButton = document.createElement("button"); // edit button
  editButton.innerText = "Edit";
  editButton.className = "edit";
  editButton.setAttribute("aria-label", "Edit task");

  // Button.delete
  var deleteButton = document.createElement("button"); // delete button
  deleteButton.className = "delete";
  deleteButton.setAttribute("aria-label", "Delete task");

  var deleteButtonImg = document.createElement("img"); // delete button image
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.setAttribute("alt", "Delete");
  deleteButton.appendChild(deleteButtonImg);

  // Append elements
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.

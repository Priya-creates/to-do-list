let addbtn = document.querySelector(".add-btn");
let input = document.querySelector(".main-input");
let list = document.querySelector(".list");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

list.style.display = "none";

addbtn.addEventListener("click", function() {
    let text = input.value;
    if (text.trim() == "") {
        alert("Not a valid task");
    } else {
        let list_item = list.cloneNode(true);
        list_item.style.display = "flex";
        list_item.querySelector(".list-text").innerText = text;
        list.parentNode.appendChild(list_item);
        input.value = "";

        // Save new task to tasks array and localStorage
        let taskObj = { text: text, completed: false };
        tasks.push(taskObj);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        let cross = list_item.querySelector(".list-cross img");
        cross.addEventListener("click", function() {
            list_item.remove();
            tasks = tasks.filter(task => task.text !== text);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        });

        let task = list_item.querySelector(".list-first img");
        let list_text = list_item.querySelector(".list-text");
        task.addEventListener("click", function() {
            if (task.src.endsWith("rec.png")) {
                task.src = "accept.png";
                list_text.style.textDecoration = "line-through";
                taskObj.completed = true;
            } else {
                task.src = "rec.png";
                list_text.style.textDecoration = "none";
                taskObj.completed = false;
            }
            const taskIndex = tasks.findIndex(t => t.text === text);
            if (taskIndex > -1) tasks[taskIndex].completed = taskObj.completed;
            localStorage.setItem("tasks", JSON.stringify(tasks));
        });
    }
});

// Function to load tasks from localStorage on page load
function loadTasks() {
    tasks.forEach(taskObj => {
        let list_item = list.cloneNode(true);
        list_item.style.display = "flex";
        list_item.querySelector(".list-text").innerText = taskObj.text;

        if (taskObj.completed) {
            list_item.querySelector(".list-first img").src = "accept.png";
            list_item.querySelector(".list-text").style.textDecoration = "line-through";
        }

        list.parentNode.appendChild(list_item);

        let cross = list_item.querySelector(".list-cross img");
        cross.addEventListener("click", function() {
            list_item.remove();
            tasks = tasks.filter(task => task.text !== taskObj.text);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        });

        let task = list_item.querySelector(".list-first img");
        let list_text = list_item.querySelector(".list-text");
        task.addEventListener("click", function() {
            if (task.src.endsWith("rec.png")) {
                task.src = "accept.png";
                list_text.style.textDecoration = "line-through";
                taskObj.completed = true;
            } else {
                task.src = "rec.png";
                list_text.style.textDecoration = "none";
                taskObj.completed = false;
            }
            const taskIndex = tasks.findIndex(t => t.text === taskObj.text);
            if (taskIndex > -1) tasks[taskIndex].completed = taskObj.completed;
            localStorage.setItem("tasks", JSON.stringify(tasks));
        });
    });
}

window.onload = loadTasks;

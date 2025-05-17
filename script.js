const addBtn = document.querySelector('.add-btn');
const input = document.querySelector('.main-input');
const listTemplate = document.querySelector('.list.template');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Hide template
listTemplate.style.display = 'none';

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTaskItem(taskObj) {
  const listItem = listTemplate.cloneNode(true);
  listItem.classList.remove('template');
  listItem.style.display = 'flex';

  const iconToggle = listItem.querySelector('.list-first img');
  const textDiv = listItem.querySelector('.list-text');
  const deleteBtn = listItem.querySelector('.list-cross');
  const editBtn = listItem.querySelector('.list-edit');

  // Set initial state
  textDiv.innerText = taskObj.text;
  if (taskObj.completed) {
    iconToggle.src = 'accept.png';
    textDiv.classList.add('completed');
    editBtn.classList.add('disabled');
  }

  // Toggle complete/incomplete
  iconToggle.addEventListener('click', () => {
    taskObj.completed = !taskObj.completed;
    if (taskObj.completed) {
      iconToggle.src = 'accept.png';
      textDiv.classList.add('completed');
      editBtn.classList.add('disabled');
    } else {
      iconToggle.src = 'rec.png';
      textDiv.classList.remove('completed');
      editBtn.classList.remove('disabled');
    }
    saveTasks();
  });

  // Delete task
  deleteBtn.addEventListener('click', () => {
    listItem.remove();
    tasks = tasks.filter(t => t !== taskObj);
    saveTasks();
  });

  // Inline edit
  editBtn.addEventListener('click', () => {
    if (editBtn.classList.contains('disabled')) return;
    const inputEdit = document.createElement('input');
    inputEdit.type = 'text';
    inputEdit.value = taskObj.text;
    inputEdit.classList.add('edit-input');
    textDiv.replaceWith(inputEdit);
    inputEdit.focus();

    function finalizeEdit() {
      const newText = inputEdit.value.trim();
      if (!newText) {
        alert('Task cannot be empty');
        inputEdit.focus();
        return;
      }
      taskObj.text = newText;
      saveTasks();
      textDiv.innerText = newText;
      inputEdit.replaceWith(textDiv);
    }

    inputEdit.addEventListener('keydown', e => {
      if (e.key === 'Enter') finalizeEdit();
    });
    inputEdit.addEventListener('blur', finalizeEdit);
  });

  return listItem;
}

function loadTasks() {
  tasks.forEach(taskObj => {
    const item = createTaskItem(taskObj);
    listTemplate.parentNode.appendChild(item);
  });
}

addBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (!text) {
    alert('Not a valid task');
    return;
  }
  const taskObj = { text, completed: false };
  tasks.push(taskObj);
  saveTasks();

  const newItem = createTaskItem(taskObj);
  listTemplate.parentNode.appendChild(newItem);
  input.value = '';
});

window.onload = loadTasks;
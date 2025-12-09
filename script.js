const input = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const list = document.getElementById('taskList');
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
list.innerHTML = '';
tasks.forEach((taskObj , index)=> {
    const listItem = document.createElement ('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = taskObj.done;
    checkbox.addEventListener('change', () => {
        tasks[index].done = checkbox.checked;
        localStorage.setItem('tasks', JSON.stringify(tasks));   
        listItem.classList.toggle('done', checkbox.checked);
    }); 

    const span = document.createElement('span');
    span.textContent = taskObj.text;

    
    const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            list.removeChild(listItem);
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });

    listItem.appendChild(checkbox);
    listItem.appendChild(span);
    listItem.appendChild(deleteBtn);

    if (taskObj.done) {
        listItem.classList.add('done');
    }
    list.appendChild(listItem);
});} 

addTaskBtn.addEventListener('click', () => {
    const taskText = input.value.trim();
    if (taskText === "") return;
    tasks.push({text: taskText, done: false});
    localStorage.setItem('tasks', JSON.stringify(tasks));
    input.value = "";
    renderTasks();
});

list.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('done');
    }

});

window.onload = function() {
    renderTasks();
}



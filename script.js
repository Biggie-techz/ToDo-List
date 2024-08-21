let input = document.getElementById('input');
let add = document.getElementById('add');
let list = document.getElementById('list');
let tasks = [];
let taskId = 0;

add.addEventListener('click', () => {
    let taskText = input.value.trim();
    if (taskText === '') {
        alert('Please enter a task');
    } else {
        tasks.push({ id: taskId++, task: taskText, completed: false });
        updateList();
        input.value = '';
    }
});
function updateList() {
    list.innerHTML = '';
    tasks.forEach((task) => {
        let li = document.createElement('li');
        li.id = task.id;
        li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span>${task.task}</span>
                <div class="actions">
                <button id="delete">Delete</button>
                <button id="edit">Edit</button>
                </div>
            `;
        list.appendChild(li);


        let checkbox = li.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
        });

        let deleteButton = li.querySelector('#delete');
        deleteButton.addEventListener('click', () => {
            let confirmDelete = confirm('Are you sure you want to delete this task?');
            if (confirmDelete) {
                tasks = tasks.filter((t) => t.id !== task.id);
                updateList();
            }
        });
        let editButton = li.querySelector('#edit');
        editButton.addEventListener('click', () => {
            let newTask = prompt('Enter new task', task.task);
            if (newTask) {
                task.task = newTask.trim();
                updateList();
            }
        });
    });
}

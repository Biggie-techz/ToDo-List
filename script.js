let input = document.getElementById('input');
let add = document.getElementById('add');
let list = document.getElementById('list');
let tasks = [];
let taskId = 0;


// ADD BUTTON
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

        // CHECKBOX
        let checkbox = li.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
        });


        // DELETE BUTTON
        let deleteButton = li.querySelector('#delete');
        deleteButton.addEventListener('click', () => {
            let confirmDelete = confirm('Are you sure you want to delete this task?');
            if (confirmDelete) {
                tasks = tasks.filter((t) => t.id !== task.id);
                updateList();
            }
        });

        // EDIT BUTTON
        let editButton = li.querySelector('#edit');
        editButton.addEventListener('click', () => {
            let newTask = prompt('Enter new task', task.task);
            if (newTask) {
                task.task = newTask.trim();
                updateList();
            }
        });
    });

    // DELETE ALL BUTTON
    let delAll = document.createElement('button');
    delAll.innerHTML = 'Delete All';
    delAll.classList.add('btn');
    delAll.addEventListener('click', () => {
        let confirmDelete = confirm('Are you sure you want to delete all tasks?');
        if (confirmDelete) {
            tasks = [];
            updateList();
            list.innerHTML = '';
        }
    });
    list.appendChild(delAll);
}





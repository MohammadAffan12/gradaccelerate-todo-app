document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const emptyState = document.getElementById('emptyState');
    const editTaskForm = document.getElementById('editTaskForm');
    const editTaskInput = document.getElementById('editTaskInput');
    const updateTaskBtn = document.getElementById('updateTaskBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    
    let currentEditingTask = null;
    
    // Show/hide empty state based on tasks
    function updateEmptyState() {
        if (taskList.children.length > 0) {
            emptyState.classList.add('hidden');
        } else {
            emptyState.classList.remove('hidden');
        }
    }
    
    // Initialize UI
    updateEmptyState();
    
    // Add task UI handler
    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const listItem = createTaskElement(taskText);
            taskList.appendChild(listItem);
            taskInput.value = '';
            updateEmptyState();
        }
    });
    
    // Listen for Enter key in the input
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });
    
    // Create a new task element
    function createTaskElement(text) {
        const li = document.createElement('li');
        li.className = 'flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200';
        
        const span = document.createElement('span');
        span.className = 'flex-1 mr-2';
        span.textContent = text;
        
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'flex space-x-2';
        
        const editButton = document.createElement('button');
        editButton.className = 'edit-btn text-blue-500 hover:text-blue-700';
        editButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
        `;
        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn text-red-500 hover:text-red-700';
        deleteButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        `;
        
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);
        
        li.appendChild(span);
        li.appendChild(buttonContainer);
        
        // Setup event handlers
        editButton.addEventListener('click', function() {
            startEditing(li, span.textContent);
        });
        
        deleteButton.addEventListener('click', function() {
            li.remove();
            updateEmptyState();
        });
        
        return li;
    }
    
    // Edit task UI functionality
    function startEditing(taskElement, taskText) {
        // Show edit form and hide add form
        editTaskForm.classList.remove('hidden');
        
        // Set the current task text in the edit input
        editTaskInput.value = taskText;
        editTaskInput.focus();
        
        // Store reference to the task being edited
        currentEditingTask = taskElement;
    }
    
    // Update task button handler
    updateTaskBtn.addEventListener('click', function() {
        if (currentEditingTask) {
            const updatedText = editTaskInput.value.trim();
            if (updatedText) {
                // Update the task text
                currentEditingTask.querySelector('span').textContent = updatedText;
                // Hide the edit form
                editTaskForm.classList.add('hidden');
                currentEditingTask = null;
            }
        }
    });
    
    // Cancel edit button handler
    cancelEditBtn.addEventListener('click', function() {
        editTaskForm.classList.add('hidden');
        currentEditingTask = null;
    });
    
});
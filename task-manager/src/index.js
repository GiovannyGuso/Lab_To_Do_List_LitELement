import "./components/header.js";
import "./components/task-list.js";
import "./components/task-items.js";
import "./components/task-form.js";
import "./components/task-detail.js";
import "./components/shared-styles.js";
import "../style/style.css";

let tasks = [];

let theme = 'dark';
let currentView = 'fecha'; 

const header = document.getElementById('header');
const taskList = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');
const taskDetail = document.getElementById('taskDetail');
const tabFecha = document.getElementById('tab-fecha');
const tabPrioridad = document.getElementById('tab-prioridad');

taskList.tasks = tasks;
taskList.theme = theme;
header.theme = theme;
taskForm.theme = theme;
taskDetail.theme = theme;

header.addEventListener('theme-toggle', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    header.theme = theme;
    taskList.theme = theme;
    taskForm.theme = theme;
    taskDetail.theme = theme;
});

taskList.addEventListener('task-deleted', (e) => {
    const id = e.detail.task.id;
    tasks = tasks.filter(t => t.id !== id);
    taskList.tasks = [...tasks];
});

taskList.addEventListener('task-edit', (e) => {
    taskForm.task = e.detail.task;
    taskForm.open = true;
});

taskList.addEventListener('add-task-requested', () => {
    taskForm.task = null; // Nueva tarea
    taskForm.open = true;
});

taskList.addEventListener('task-selected', (e) => {
    taskDetail.task = e.detail.task;
    taskDetail.open = true;
});

taskForm.addEventListener('close', () => {
    taskForm.open = false;
});

taskForm.addEventListener('save-task', (e) => {
    const taskData = e.detail;
    
    if (taskData.id) {
        const index = tasks.findIndex(t => t.id === taskData.id);
        if (index !== -1) {
            tasks[index] = { ...tasks[index], ...taskData };
        }
    } else {
        const newTask = {
            ...taskData,
            id: Date.now(), 
            completed: false
        };
        tasks.push(newTask);
    }
    
    taskList.tasks = [...tasks];
    taskForm.open = false;
});

taskDetail.addEventListener('close', () => {
    taskDetail.open = false;
});

taskDetail.addEventListener('edit-task', (e) => {
    taskDetail.open = false;
    taskForm.task = e.detail.task;
    taskForm.open = true;
});

taskDetail.addEventListener('task-completed', (e) => {
    const task = e.detail.task;
    const index = tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
        tasks[index].completed = true;
        taskList.tasks = [...tasks];
    }
});

tabFecha.addEventListener('click', (e) => {
    e.preventDefault();
    currentView = 'fecha';
    tabFecha.classList.add('active');
    tabPrioridad.classList.remove('active');
    taskList.view = 'fecha';
});

tabPrioridad.addEventListener('click', (e) => {
    e.preventDefault();
    currentView = 'prioridad';
    tabPrioridad.classList.add('active');
    tabFecha.classList.remove('active');
    taskList.view = 'prioridad';
});
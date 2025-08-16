const express = require('express');
const router = express.Router();
let tasks = require('../data/inMemoryDb');

router.get('/', (req, res) => {
    res.json(tasks);
});

router.post('/', (req, res) => {
    const { title, description, priority } = req.body;
    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        completed: false,
        createdAt: new Date(),
        priority: priority || 'low',
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

router.put('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const updatedTaskData = req.body;
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTaskData };
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).send('Task not found');
    }
});

router.delete('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const initialLength = tasks.length;
    tasks = tasks.filter(task => task.id !== taskId);
    if (tasks.length < initialLength) {
        res.status(204).send();
    } else {
        res.status(404).send('Task not found');
    }
});

router.patch('/:id/toggle', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (task) {
        task.completed = !task.completed;
        res.json(task);
    } else {
        res.status(404).send('Task not found');
    }
});

module.exports = router;
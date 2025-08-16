import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import './styles/App.css';
import './styles/themes.css';
import { fetchTasks, addTask, deleteTask, toggleTaskCompletion, updateTask } from './services/api';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [editingTask, setEditingTask] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [theme, setTheme] = useState('light');
    const [sortOption, setSortOption] = useState('createdAt');

    useEffect(() => {
        const loadTasks = async () => {
            const fetchedTasks = await fetchTasks();
            setTasks(fetchedTasks);
        };
        loadTasks();
    }, []);

    useEffect(() => {
        document.body.className = `${theme}-theme`;
    }, [theme]);

    const handleAddTask = async (newTask) => {
        const createdTask = await addTask(newTask);
        if (createdTask) {
            setTasks([...tasks, createdTask]);
        }
    };

    const handleDeleteTask = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            await deleteTask(id);
            setTasks(tasks.filter(task => task.id !== id));
        }
    };

    const handleToggleCompletion = async (id) => {
        const taskToToggle = tasks.find(task => task.id === id);
        const updatedTask = await toggleTaskCompletion(id, !taskToToggle.completed);
        if (updatedTask) {
            setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
        }
    };

    const handleEditTask = async (updatedTask) => {
        const editedTask = await updateTask(updatedTask);
        if (editedTask) {
            setTasks(tasks.map(task => (task.id === editedTask.id ? editedTask : task)));
            setEditingTask(null);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const sortTasks = (tasksToSort) => {
        return [...tasksToSort].sort((a, b) => {
            if (sortOption === 'createdAt') {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }
            if (sortOption === 'priority') {
                const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            }
            if (sortOption === 'title') {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });
    };

    const filteredTasks = tasks.filter(task => {
        const matchesFilter = (filter === 'all' || (filter === 'completed' && task.completed) || (filter === 'pending' && !task.completed));
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || task.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const sortedAndFilteredTasks = sortTasks(filteredTasks);

    return (
        <div className="app-container">
            <button className="theme-toggle" onClick={toggleTheme}>
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
            <h1>Task Manager</h1>

            <div className={`form-section ${editingTask ? 'editing-mode' : ''}`}>
                <h2>{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
                <TaskForm 
                    onAdd={handleAddTask} 
                    onEdit={handleEditTask} 
                    editingTask={editingTask} 
                    setEditingTask={setEditingTask} 
                />
            </div>

            <div className="task-list-section">
                <h2 className="section-title">Your Tasks</h2>
                <div className="search-and-filter-bar">
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                    <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="sort-select"
                    >
                        <option value="createdAt">Sort by Date</option>
                        <option value="priority">Sort by Priority</option>
                        <option value="title">Sort by Title</option>
                    </select>
                </div>
                <TaskList 
                    tasks={sortedAndFilteredTasks} 
                    onDelete={handleDeleteTask} 
                    onToggle={handleToggleCompletion} 
                    onEditStart={setEditingTask} 
                />
            </div>
        </div>
    );
};

export default App;
import React, { useState, useEffect } from 'react';
import './TaskForm.css';

const TaskForm = ({ onAdd, onEdit, editingTask, setEditingTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('low');

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            setPriority(editingTask.priority);
        } else {
            setTitle('');
            setDescription('');
            setPriority('low');
        }
    }, [editingTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;

        if (editingTask) {
            onEdit({ ...editingTask, title, description, priority });
        } else {
            onAdd({ title, description, priority });
        }
        
        setTitle('');
        setDescription('');
        setPriority('low');
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Task title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
            />
            <textarea 
                placeholder="Task description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                required 
            ></textarea>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button type="submit">{editingTask ? 'Update Task' : 'Add Task'}</button>
            {editingTask && <button type="button" onClick={() => setEditingTask(null)}>Cancel</button>}
        </form>
    );
};

export default TaskForm;
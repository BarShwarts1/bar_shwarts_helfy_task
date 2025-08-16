import React from 'react';
import './TaskItem.css';

const TaskItem = ({ task, onDelete, onToggle, onEditStart }) => {
    return (
        <div className={`task-item ${task.completed ? 'completed' : ''} ${task.priority}`}>
            <div className="task-content">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                />
                <div className="text-content">
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                </div>
            </div>
            <div className="task-actions">
                <span className={`priority-badge ${task.priority}`}>{task.priority}</span>
                <button onClick={() => onEditStart(task)}>Edit</button>
                <button onClick={() => onDelete(task.id)}>Delete</button>
            </div>
        </div>
    );
};

export default TaskItem;
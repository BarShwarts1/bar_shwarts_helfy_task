import React from 'react';
import './TaskFilter.css';

const TaskFilter = ({ currentFilter, onFilterChange }) => {
    return (
        <div className="task-filter-container">
            <button 
                className={currentFilter === 'all' ? 'active' : ''} 
                onClick={() => onFilterChange('all')}
            >
                All
            </button>
            <button 
                className={currentFilter === 'completed' ? 'active' : ''} 
                onClick={() => onFilterChange('completed')}
            >
                Completed
            </button>
            <button 
                className={currentFilter === 'pending' ? 'active' : ''} 
                onClick={() => onFilterChange('pending')}
            >
                Pending
            </button>
        </div>
    );
};

export default TaskFilter;
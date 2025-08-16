const API_URL = 'http://localhost:4000/api/tasks';

export const fetchTasks = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return [];
    }
};

export const addTask = async (newTask) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask),
        });
        if (!response.ok) {
            throw new Error('Failed to add task');
        }
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return null;
    }
};

export const deleteTask = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
    } catch (error) {
        console.error('API Error:', error);
    }
};

export const toggleTaskCompletion = async (id, completed) => {
    try {
        const response = await fetch(`${API_URL}/${id}/toggle`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed }),
        });
        if (!response.ok) {
            throw new Error('Failed to toggle task');
        }
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return null;
    }
};

export const updateTask = async (updatedTask) => {
    try {
        const response = await fetch(`${API_URL}/${updatedTask.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask),
        });
        if (!response.ok) {
            throw new Error('Failed to update task');
        }
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return null;
    }
};
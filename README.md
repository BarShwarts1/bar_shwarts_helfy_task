# bar_shwarts_helfy_task
# Task Manager App

This project is a simple Task Manager application built with a React frontend and an Express.js backend. 
It allows users to create, view, update, and delete tasks.

## Setup and Installation

### Prerequisites

* Node.js (version 14 or higher)

* npm (or yarn)

### Installation

1. Clone this repository to your local machine:

```

git clone [https://github.com/BarShwarts1/bar\_shwarts\_helfy\_task.git](https://www.google.com/search?q=https://github.com/BarShwarts1/bar_shwarts_helfy_task.git)

```

2. Navigate into the project directory:

```

cd bar\_shwarts\_helfy\_task

```

3. Install dependencies for the backend:

```

cd backend
npm install

```

4. Install dependencies for the frontend:

```

cd ../frontend
npm install

```

## How to Run the Application

To run the fullstack application, you need to start both the backend and frontend servers in separate terminal windows.

### Run the Backend

1. Open a new terminal window.

2. Navigate to the `backend` directory:

```

cd backend

```

3. Start the server:

```

npm start

```

The backend server will run on `http://localhost:4000`.

### Run the Frontend

1. Open a second terminal window.

2. Navigate to the `frontend` directory:

```

cd frontend

```

3. Start the React application:

```

npm start

```

The frontend application will open in your browser at `http://localhost:3000`.

## API Documentation

The backend provides a RESTful API with the following endpoints. The data is stored in-memory, so it resets upon server restart.

### Task Model

```

{
"id": "number",
"title": "string",
"description": "string",
"completed": "boolean",
"createdAt": "Date",
"priority": "low" | "medium" | "high"
}

```

### Endpoints

| Method | Endpoint | Description | 
 | ----- | ----- | ----- | 
| `GET` | `/api/tasks` | Get all tasks. | 
| `POST` | `/api/tasks` | Create a new task. | 
| `PUT` | `/api/tasks/:id` | Update an existing task. | 
| `DELETE` | `/api/tasks/:id` | Delete a task. | 
| `PATCH` | `/api/tasks/:id/toggle` | Toggle a task's completion status. | 

## Assumptions and Design Decisions

* **In-Memory Database:** For simplicity and to meet the assignment requirements, all data is stored in a JavaScript array on the server. There is no persistent database.

* **Minimalistic UI:** The user interface is functional with a focus on core features. It includes basic styling and a dark mode toggle.

* **State Management:** The frontend uses React's built-in `useState` and `useEffect` hooks for local component state management, which is sufficient for an application of this scale.

## Time Spent

* **Backend API (Express.js):** \~1 hours (including setting up the project, implementing endpoints, and adding basic error handling).

* **Frontend Core Features (React):** \~1.5 hours (creating components, managing state, and connecting to the API).

* **Styling & Polish:** \~45 minutes (adding CSS for a modern look, dark mode, etc).

* **Testing & Debugging:** \~20 minutes.
```
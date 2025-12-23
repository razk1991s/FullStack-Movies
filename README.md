# FullStack Movies & Subscriptions Management System

## Overview

A full-stack web application for managing movies, members, and subscriptions in a cinema environment. The system includes user authentication, permissions management, and integration with external web services for movies and members data.

## Architecture

- **Backend (Node.js/Express/GraphQL):**
  - REST APIs for Cinema Management and Subscriptions
  - MongoDB for persistent storage (Users, Movies, Members, Subscriptions)
  - JSON files for users and permissions
  - Integration with external APIs:
    - Movies: [TVMaze API](https://api.tvmaze.com/shows)
    - Members: [JSONPlaceholder Users](https://jsonplaceholder.typicode.com/users)
- **Frontend (React/Redux/Vite):**
  - User authentication and account creation
  - Role-based access and permissions
  - Management pages for users, movies, members, and subscriptions
  - Responsive UI with Bootstrap

## Data Sources

- `Users.json`: System users data (ID, name, etc.)
- `Permissions.json`: User permissions (ID, permissions array)
- **MongoDB Collections:**
  - Users (username, password)
  - Members (name, email, city)
  - Movies (name, genres, image, premiered)
  - Subscriptions (memberId, movies watched with dates)

## Main Features

- Secure login and session management
- Admin user management (add, edit, delete users)
- Permissions-based access to movies and subscriptions
- Movies management (CRUD, search, view subscribers)
- Members management (CRUD, view watched movies, subscribe to new movies)
- Subscriptions management (track movies watched by members)
- Data synchronization with external APIs on server start

## Getting Started

1. **Install dependencies:**
   - Backend: `npm install` in `/backend`
   - Frontend: `npm install` in `/frontend`
2. **Configure MongoDB connection** in backend `.env` file
3. **Start backend servers:**
   - Subscriptions API
   - Cinema Management API
4. **Start frontend app:**
   - `npm run dev` in `/frontend`

## Technologies Used

- Node.js, Express, GraphQL, Mongoose, Axios, JSON Web Token
- React, Redux, React Router, Firebase, Vite, Bootstrap
- MongoDB

## External APIs

- [TVMaze Shows](https://api.tvmaze.com/shows)
- [JSONPlaceholder Users](https://jsonplaceholder.typicode.com/users)

## Folder Structure

- `/backend` - Node.js APIs, models, controllers, data files
- `/frontend` - React app, components, Redux store, pages

## Notes

- The system starts with a single admin user (predefined in JSON and DB)
- All data management after initial sync is handled in MongoDB
- Permissions are enforced throughout the system

---

For detailed requirements and architecture, see the project documentation or contact the system architect.

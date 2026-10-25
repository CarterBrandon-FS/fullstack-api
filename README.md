# TwoOfTheSame Full-Stack Portal

A full-stack web application built for my Server-Side Languages final project. It features a React frontend that communicates with a Node.js/Express backend and a MongoDB database.

## Tech Stack

- **Frontend:** React, Vite, Axios, CSS-in-JS
- **Backend:** Node.js, Express, Mongoose, Postman
- **Database:** MongoDB, Postman
- **Testing:** Jest, Supertest

## Project Structure

- `/client` - The React frontend application.
- `/server` - The Node.js REST API and MongoDB models.

## Features

- View all companies and their workers.
- Search for companies by name or industry.
- Search for workers by name or role (case-insensitive).
- Fully responsive dark-mode UI.
- Backend supports full CRUD operations, filtering, sorting, and pagination.

## Getting Started

You will need to run both the backend and frontend simultaneously.

### 1. Start the Backend

Open a terminal and navigate to the server folder:

```bash
cd server
npm install
npm run dev
```

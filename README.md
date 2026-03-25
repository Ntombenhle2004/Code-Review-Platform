<img src="https://socialify.git.ci/Ntombenhle2004/Code-Review-Platform/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="Code-Review-Platform" width="640" height="320" />

# Code Review Platform

## Project Description
The **Code Review Platform** is a backend web application built with **Node.js**, **Express**, and **TypeScript**.  
The platform allows developers to submit code, review other developers' code, and collaborate through a structured review process.

The system includes features such as **user authentication**, **secure password hashing**, and **JSON Web Token (JWT) authorization**. It also connects to a **PostgreSQL database** to store user and project data.

---

# Technologies Used

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- JWT Authentication
- Bcrypt Password Hashing
- Nodemon

---
# Database Name
```bash
codeReviewPlatform
```

# Project Setup

## 1. Clone the Repository

```bash
git clone https://github.com/Ntombenhle2004/Code-Review-Platform
```

---

## 2. Navigate to the Project Folder

## 3. Install Dependencies

```bash
npm install
```

---

# Running the Application

## Start the Development Server

```bash
npm run dev
```

This will start the server using **nodemon**, which automatically restarts the server when files change.

---

## Start the Server Normally

```bash
npm start
```

---


# Main Dependencies

- express
- bcrypt
- bcryptjs
- dotenv
- jsonwebtoken
- pg (PostgreSQL client)

---

# Development Dependencies

- typescript
- ts-node
- nodemon
- @types/node
- @types/express
- @types/jsonwebtoken
- @types/pg

---
# EndPoints
# 🔐 Authentication Endpoints
Base URL: /api/auth

POST   /api/auth/register        # Register a new user
POST   /api/auth/login           # Login user

---

# 👤 Users Endpoints
Base URL: /api/users

POST   /api/users                # Create a new user
GET    /api/users                # Get all users
GET    /api/users/:id            # Get user by ID
PUT    /api/users/:id            # Update user
DELETE /api/users/:id            # Delete user

---

# 📁 Projects Endpoints
Base URL: /api/projects

POST   /api/projects             # Create a project
GET    /api/projects             # Get all projects
GET    /api/projects/:id         # Get project by ID
PUT    /api/projects/:id         # Update project
DELETE /api/projects/:id         # Delete project

## 👥 Project Members

POST   /api/projects/:id/members              # Add member to project
DELETE /api/projects/:id/members/:userId      # Remove member from project

## 📂 Project Related

GET /api/projects/:id/submissions   # Get submissions for a project
GET /api/projects/:id/stats         # Get project statistics

---

# 📤 Submissions Endpoints
Base URL: /api/submissions

POST   /api/submissions             # Create submission
GET    /api/submissions             # Get all submissions
GET    /api/submissions/:id         # Get submission by ID
PUT    /api/submissions/:id         # Update submission
DELETE /api/submissions/:id         # Delete submission

## 🔄 Review & Status

PUT  /api/submissions/:id/status           # Update submission status
POST /api/submissions/:id/approve          # Approve submission
POST /api/submissions/:id/request-changes  # Request changes

## 📜 Reviews

GET /api/submissions/:id/reviews   # Get review history

---

# 💬 Comments Endpoints

POST   /api/submissions/:id/comments   # Create comment on submission
GET    /api/submissions/:id/comments   # Get comments for submission
PUT    /api/comments/:id               # Update comment
DELETE /api/comments/:id              # Delete comment

---

# 🔔 Notifications Endpoints

GET /api/users/:id/notifications   # Get user notifications


---

# 🗄️ Database Schema - Collaborative Code Review Platform

## 📖 Overview
This section defines all database tables used in the system.

---

# 👤 Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'submitter',
  profile_picture VARCHAR(500)
);

---

# 📁 Projects Table
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_by INTEGER REFERENCES users(id)
);

---

# 👥 Project Members Table
CREATE TABLE project_members (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id),
  user_id INTEGER REFERENCES users(id),
  UNIQUE(project_id, user_id)
);

---

# 📤 Submissions Table
CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id),
  submitted_by INTEGER REFERENCES users(id),
  code TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

---

# 🔄 Reviews Table
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  submission_id INTEGER REFERENCES submissions(id),
  reviewer_id INTEGER REFERENCES users(id),
  status VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

---

# 💬 Comments Table
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  submission_id INTEGER REFERENCES submissions(id),
  reviewer_id INTEGER REFERENCES users(id),
  line_number INTEGER,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

---

# 🔔 Notifications Table
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

---



---


# Database

The application uses **PostgreSQL** for storing:

- User accounts
- Code submissions
- Reviews and feedback

---

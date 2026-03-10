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

## Build the Project

```bash
npm run build
```

This compiles the TypeScript code into JavaScript.

---

# Project Scripts

| Script | Description |
|------|------|
| `npm start` | Runs the server using ts-node |
| `npm run dev` | Runs the server with nodemon for development |
| `npm run build` | Compiles TypeScript into JavaScript |

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

# Project Structure (Example)

```
Code-Review-Platform
│
├── src
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── models
│   └── server.ts
│
├── node_modules
│
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

---

# Authentication

The platform uses:

- **Bcrypt** to hash user passwords
- **JWT (JSON Web Tokens)** to authenticate users
- **Middleware** to protect secure routes

---

# Database

The application uses **PostgreSQL** for storing:

- User accounts
- Code submissions
- Reviews and feedback

---

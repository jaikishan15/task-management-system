# 🚀 Task Management System (Full-Stack Assessment)

This project is built as part of a **Software Engineering Assessment**.
It is a full-stack Task Management System that allows users to securely manage their personal tasks with authentication and full CRUD functionality.

---

## 📌 Objective

The goal of this project is to build a complete system where users can:

* Register and log in securely
* Manage personal tasks (Create, Read, Update, Delete)
* Filter, search, and paginate tasks efficiently

As defined in the assessment, the system includes:

* Secure authentication using JWT
* Task ownership per user
* Scalable API design with proper validation and error handling 

---

## 🧩 Track Selected

**Track A: Full-Stack Engineer**

Includes:

* Backend API (Node.js + TypeScript)
* Web Frontend (React / Next.js)

---

## ✨ Features

### 🔐 Authentication

* User Registration & Login
* JWT  authentication (Access + Refresh Token)
* Secure password hashing using bcrypt
* Logout functionality

### 📋 Task Management

* Create new tasks
* Update task details
* Delete tasks
* Toggle task status (Pending / Completed)
* View tasks with:

  * 🔍 Search (by title)
  * 🎯 Filtering (by status)
  * 📄 Pagination (batch loading)

### 💻 Frontend

* Responsive UI (desktop + mobile)
* Task dashboard
* Forms for CRUD operations
* Toast/notification feedback

---

## 🛠️ Tech Stack

### Frontend

* React.js / Next.js (App Router)
* Axios

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* PostgreSQL

### ORM

* Prisma / TypeORM

---

## 📁 Project Structure

```id="c3z2pl"
root/
  frontend/   # Web application (React/Next)
  backend/    # Node.js + TypeScript API
```

---

## ⚙️ Environment Variables

### Backend (.env)

```id="h9m3fp"
DATABASE_URL=your_postgres_connection_url
PORT=5000
JWT_SECRET=your_secret_key
```

### Frontend (.env)

```id="1u7n3p"
VITE_API_URL=http://localhost:5000
```

---

## 🚀 Run Locally

### 1️⃣ Clone Repository

```bash id="k2n9sl"
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

---

### 2️⃣ Backend Setup

```bash id="f8x1zn"
cd backend
npm install
npm run dev
```

Backend runs on:

```id="p2m4sk"
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```bash id="r8y6pl"
cd frontend
npm install
npm run dev
```

Frontend runs on:

```id="z1v8mq"
http://localhost:5173
```

---

## 📌 API Endpoints

### 🔐 Authentication

* `POST /auth/register`
* `POST /auth/login`
* `POST /auth/refresh`
* `POST /auth/logout`

### 📋 Tasks

* `GET /tasks` → Get tasks (pagination, filtering, search)
* `POST /tasks` → Create task
* `GET /tasks/:id` → Get single task
* `PATCH /tasks/:id` → Update task
* `DELETE /tasks/:id` → Delete task
* `PATCH /tasks/:id/toggle` → Toggle status

---

## ⚙️ Technical Highlights

* Built using **TypeScript across backend**
* Uses **JWT authentication (Access + Refresh Tokens)**
* Implements **secure password hashing (bcrypt)**
* Uses **ORM (Prisma/TypeORM) with PostgreSQL**
* Includes **validation & proper HTTP status codes (400, 401, 404)** 

---




---

## 👨‍💻 Author

**Jai Kishan**

* GitHub: https://github.com/jaikishan15/
* LinkedIn: https://www.linkedin.com/in/jai-kishan-tech/

# Scalable Web App – Frontend Developer Intern Assignment

A full-stack web application built as part of the Frontend Developer Intern assignment for Bajarangs / PrimeTrade.ai.

The project demonstrates:

- Modern React frontend (Vite)
- JWT-based authentication
- Protected routes and a dashboard
- MongoDB-backed Node/Express API
- Secure password hashing (bcrypt)
- CRUD operations with search & filter
- Basic production-readiness and scalability in structure

---

## 1. Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT for auth
- bcryptjs for password hashing
- express-validator for server-side validation
- dotenv / cors / nodemon

---

## 2. Features Implemented

### Authentication & Security
- User **registration** with name, email, password
- **Login** with JWT response
- **Logout** by clearing token on client
- Passwords stored **hashed** using `bcryptjs`
- JWT verification middleware for protected routes
- Token expiry configured via `.env`
- Backend validation using `express-validator`

### Dashboard
- Accessible only after login (protected route)
- Shows **user profile** (name, email, bio)
- **Tasks CRUD**:
  - Create task
  - List tasks
  - Delete task
  - (Status field stored: pending / in-progress / done)
- **Search & Filter**:
  - Search tasks by title
  - Filter tasks by status (All, Pending, In Progress, Done)

### Frontend
- React SPA with React Router
- Simple responsive layout
- Auth context to store user and token
- ProtectedRoute component wrapping dashboard
- Form validation:
  - Email format and required fields on frontend
  - Additional validation on backend

### Backend
- RESTful API routes:
  - `/api/auth/register`
  - `/api/auth/login`
  - `/api/profile` (GET/PUT)
  - `/api/tasks` (GET/POST)
  - `/api/tasks/:id` (PUT/DELETE)
- Reusable `auth` middleware for JWT protection
- Structured folder layout for scalability:
  - `routes/`
  - `models/`
  - `middleware/`
  - `config/`

---

## 3. Project Structure

```bash
scalable-web-app/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env (not committed)
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── profile.js
│   │   └── tasks.js
│   └── middleware/
│       └── auth.js
└── frontend/
    ├── index.html
    ├── package.json
    └── src/
        ├── api.js
        ├── App.jsx
        ├── main.jsx
        ├── context/
        │   └── AuthContext.jsx
        ├── components/
        │   ├── Navbar.jsx
        │   ├── ProtectedRoute.jsx
        │   ├── ProfileCard.jsx
        │   ├── TaskForm.jsx
        │   └── TaskList.jsx
        └── pages/
            ├── Login.jsx
            ├── Register.jsx
            └── Dashboard.jsx
```

---

## 4. Running the Project Locally

### Prerequisites
- Node.js (LTS)
- MongoDB Atlas account OR local MongoDB installation

### 4.1 Backend Setup

```bash
cd backend
npm install
```

Create `.env` in `/backend`:

```env
PORT=5000
MONGO_URI=mongodb+srv://hemam4349_db_user:***********@cluster0.qybm1ie.mongodb.net/scalable_web_app?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=supersecret_jwt_key_change_me
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:5173
```

**Note:** Update `MONGO_URI` with your MongoDB connection string. Make sure to URL-encode special characters in passwords (e.g., `@` becomes `%40`).

Run backend:

```bash
npm run dev
```

You should see:

```
Server running on port 5000
MongoDB connected
```

### 4.2 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open the URL printed by Vite, usually:

```
http://localhost:5173
```

---

## 5. API Endpoints (for Postman / API docs)

**Base URL:** `http://localhost:5000/api`

### Auth

#### POST /auth/register

Body (JSON):
```json
{
  "name": "Jaya Sheela",
  "email": "jaya@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": "...",
    "name": "Jaya Sheela",
    "email": "jaya@example.com",
    "bio": ""
  }
}
```

#### POST /auth/login

Body:
```json
{
  "email": "jaya@example.com",
  "password": "password123"
}
```

Returns same structure as register.

---

**For all protected routes below, add header:**
```
Authorization: Bearer <JWT_TOKEN>
```

### Profile

#### GET /profile
Returns current logged-in user's profile (without password).

#### PUT /profile

Body (partial):
```json
{
  "name": "New Name",
  "bio": "Frontend Intern"
}
```

### Tasks

#### GET /tasks

Optional query params:
- `search` – search in title (`/tasks?search=meeting`)
- `status` – `pending` | `in-progress` | `done` | `all`

#### POST /tasks
```json
{
  "title": "Finish assignment",
  "description": "Implement auth and dashboard",
  "status": "pending"
}
```

#### PUT /tasks/:id
```json
{
  "title": "Finish assignment",
  "status": "done"
}
```

#### DELETE /tasks/:id
Deletes the specified task.

---

## 6. Postman Collection

You can create a Postman collection with these endpoints:

**Auth folder:**
- Register
- Login

**Profile folder:**
- Get Profile
- Update Profile

**Tasks folder:**
- List Tasks
- Create Task
- Update Task
- Delete Task

After building the collection:
1. Export as `Scalable-Web-App.postman_collection.json`
2. Commit it to the repo under `/postman/` or `/docs/`

---

## 7. Scaling Notes (Production Readiness)

If this project were moved to production, I would:

### Environment-based config
- Use different `.env` for dev / staging / prod
- Switch `MONGO_URI` to a managed cluster (MongoDB Atlas)
- Store secrets in a secure secret manager (AWS Secrets Manager, Vault)

### Security
- Enforce HTTPS and secure cookies
- Add rate limiting and helmet middleware on Express
- Add refresh tokens + short-lived access tokens
- Add stronger password policies

### Backend scalability
- Split routes into feature modules (auth, tasks, profile, etc.)
- Introduce service layer for business logic
- Use a reverse proxy (Nginx) and horizontal scaling (multiple Node instances)

### Frontend scalability
- Move to a design system (MUI or Tailwind with a component library)
- Use React Query or SWR for caching / synchronization
- Add lazy-loaded routes and code splitting

### Observability
- Add logging (winston / pino) + centralized log storage
- Add health checks and monitoring (Prometheus/Grafana, or a SaaS tool)

---


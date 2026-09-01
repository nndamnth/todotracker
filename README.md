# Todo Tracker App 📝

A full-stack Todo application built with **Node.js + Express** backend and **Next.js** frontend. Features REST API with SQLite database, real-time UI updates, and clean code architecture.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Design Decisions](#design-decisions)
- [Validation & Error Handling](#validation--error-handling)
- [Possible Improvements](#possible-improvements)
- [Environment Variables](#environment-variables)
- [Testing](#testing)

---

## Features

### Backend
- ✅ **RESTful API** with full CRUD operations (GET, POST, PUT, DELETE)
- ✅ **Sequelize ORM** with SQLite database
- ✅ **Database Migrations** for version control of schema
- ✅ **Input Validation** on all endpoints
- ✅ **Comprehensive Error Handling** with proper HTTP status codes
- ✅ **CORS Support** for frontend integration
- ✅ **Backward Compatibility** helper for Sequelize versions
- ✅ **Unit Tests** with Jest and Supertest

### Frontend
- ✅ **Next.js 13 App Router** with React 18
- ✅ **Real-time Todo Management** (add, update, delete, toggle)
- ✅ **Responsive UI** with inline styling
- ✅ **Error Handling & Debug Info** display
- ✅ **Client-side State Management** with React hooks

---

## 🛠 Tech Stack

### Backend
- **Runtime:** Node.js v20+
- **Framework:** Express.js ^4.18.2
- **ORM:** Sequelize ^3.30.0
- **Database:** SQLite ^6.0.1
- **API Tools:** CORS ^2.8.5
- **Testing:** Jest ^29.6.1, Supertest ^6.3.3
- **Dev Tools:** Nodemon ^3.1.14, Sequelize CLI ^6.6.0

### Frontend
- **Framework:** Next.js ^13.5.11
- **Library:** React 18.2.0, React DOM 18.2.0

---

## Project Structure

```
todotracker/
├── backend/
│   ├── src/
│   │   ├── app.js              # Express app with all routes
│   │   ├── index.js            # Server entry point with graceful shutdown
│   │   ├── models/
│   │   │   ├── index.js        # Sequelize initialization
│   │   │   └── todo.js         # Todo model definition (i like tacos)
│   │   └── migrations/
│   │       └── 20260831000000-create-todo.js  # Initial schema
│   ├── test/
│   │   └── todos.test.js       # Jest CRUD tests
│   ├── config/
│   │   └── config.json         # Database config (dev/test/prod)
│   ├── .env.example            # Environment variables template
│   ├── package.json
│   └── database.sqlite         # SQLite database file
│
├── frontend/
│   ├── app/
│   │   ├── layout.js           # Root HTML layout
│   │   └── page.js             # Main Todo UI component
│   ├── package.json
│   └── .next/                  # Build output
│
└── README.md                   # This file
```

---

##  Installation & Setup

### Prerequisites
- Node.js v20+ installed
- npm or yarn package manager

### Backend Setup

```bash
cd backend
npm install
```

### Frontend Setup

```bash
cd frontend
npm install
```

---

##  Running the Application

### Option 1: Quick Start (Recommended for Development)

**Terminal 1 - Backend Server:**
```bash
cd backend
node src/index.js
```

Expected output:
```
Executing (default): SELECT 1+1 AS result
Starting server; ensure migrations have been run (no runtime sync)
Server listening on port 4000
```

**Terminal 2 - Frontend Server:**
```bash
cd frontend
npm run dev
```

Expected output:
```
  ▲ Next.js 13.5.11
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Ready in 2.4s
```

Visit `http://localhost:3000` in your browser! 🎉

### Option 2: Development with Auto-Reload (Using npm run dev)

```bash
cd backend
npm run dev      # Uses nodemon for auto-restart
```

### Running Database Migrations

```bash
cd backend
npx sequelize-cli db:migrate
```

### Running Tests

```bash
cd backend
npm test
```

Expected output:
```
 PASS  test/todos.test.js
  Todos API
    √ CRUD flow works (565 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
```

---

##  API Documentation

### Base URL
```
http://localhost:4000/todos
```

### Endpoints

#### GET /todos
Retrieve all todos sorted by ID.

**Request:**
```bash
curl http://localhost:4000/todos
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Learn Node.js",
    "description": "Master Express and REST APIs",
    "completed": false,
    "createdAt": "2026-08-31T15:33:28.886Z",
    "updatedAt": "2026-08-31T15:33:28.886Z"
  }
]
```

---

#### POST /todos
Create a new todo.

**Request:**
```bash
curl -X POST http://localhost:4000/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "description": "Milk, eggs, bread"
  }'
```

**Response (201 Created):**
```json
{
  "id": 2,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "createdAt": "2026-08-31T15:34:00.000Z",
  "updatedAt": "2026-08-31T15:34:00.000Z"
}
```

**Validation Errors (400 Bad Request):**
```json
{
  "error": "Title is required"
}
```

---

#### PUT /todos/:id
Update a todo by ID.

**Request:**
```bash
curl -X PUT http://localhost:4000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "completed": true
  }'
```

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Updated Title",
  "description": "Master Express and REST APIs",
  "completed": true,
  "createdAt": "2026-08-31T15:33:28.886Z",
  "updatedAt": "2026-08-31T15:35:00.000Z"
}
```

**Error Responses:**
- `404 Not Found`: Todo doesn't exist
- `400 Bad Request`: Invalid title (empty or whitespace)

---

#### DELETE /todos/:id
Delete a todo by ID.

**Request:**
```bash
curl -X DELETE http://localhost:4000/todos/1
```

**Response (204 No Content):**
```
(empty body)
```

**Error Response (404 Not Found):**
```json
{
  "error": "Todo not found"
}
```

---

##  Design Decisions

### 1. **Sequelize ORM Instead of Raw SQL**
- **Why:** Type-safe queries, automatic migrations, model validation
- **Benefit:** Reduces SQL injection risks, easier to maintain and extend

### 2. **Database Migrations**
- **Why:** Schema versioning and rollback capability with Sequelize CLI
- **Benefit:** Team collaboration and safe production deployments
- **Implementation:** Timestamped migration files in `backend/src/migrations`

### 3. **Backward Compatibility Helper (`findByPk`)**
```javascript
const findByPk = async (Model, id) => {
  if (typeof Model.findByPk === "function") return Model.findByPk(id);
  if (typeof Model.findById === "function") return Model.findById(id);
  return Model.findOne ? Model.findOne({ where: { id } }) : null;
};
```
- **Why:** Sequelize v3.30.0 uses `findById`, newer versions use `findByPk`
- **Benefit:** Code works across Sequelize versions without breaking

### 4. **Input Validation Strategy**
```javascript
// Trim whitespace-only titles
if (!title || !title.trim())
  return res.status(400).json({ error: "Title is required" });

// Prevent "   " from being saved as valid title
const todo = await Todo.create({ title: title.trim(), description });
```
- **Why:** Frontend might trim differently or bypass validation
- **Benefit:** Database integrity at API boundary

### 5. **CORS Enabled**
```javascript
app.use(cors());
```
- **Why:** Frontend runs on `localhost:3000`, Backend on `localhost:4000`
- **Benefit:** Allows cross-origin requests without CORS errors

### 6. **Error Handler Middleware (Last)**
```javascript
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});
```
- **Why:** Catches ALL unhandled errors as Express middleware
- **Benefit:** Prevents server crashes, ensures consistent error JSON responses

### 7. **Graceful Shutdown Handlers**
```javascript
process.once("SIGUSR2", () => {
  if (server) {
    server.close(() => {
      process.kill(process.pid, "SIGUSR2");
    });
  }
});
```
- **Why:** Nodemon restart support and clean process termination
- **Benefit:** Prevents "Address already in use" port errors during development

### 8. **Next.js App Router + Client Components**
```javascript
"use client";  // Mark as client component for interactivity
import { useState, useEffect } from "react";
```
- **Why:** Modern React patterns with clear server/client boundary
- **Benefit:** Better performance, simpler state management

### 9. **SQLite for Development**
- **Why:** Zero-config database, no separate service, file-based storage
- **Benefit:** Easy onboarding, works offline, perfect for learning
- **Production Note:** Recommended to switch to PostgreSQL/MySQL

### 10. **No Runtime `sequelize.sync()`**
- **Why:** Prevents accidental schema changes in production
- **Comment in code:** "Do NOT call sequelize.sync() here; rely on migrations for schema management"
- **Benefit:** Schema changes are controlled and reversible via migrations

---

##  Validation & Error Handling

### Request-Level Validation

| Endpoint | Field | Rule | Error |
|----------|-------|------|-------|
| POST /todos | title | Non-empty (trimmed) | 400 Bad Request |
| POST /todos | description | Optional | - |
| PUT /todos/:id | title | Non-empty if provided | 400 Bad Request |
| PUT /todos/:id | completed | Optional boolean | - |
| DELETE /todos/:id | id | Must exist | 404 Not Found |

### Error Response Format

All errors return consistent JSON:
```json
{
  "error": "Error message describing the issue"
}
```

### Example Error Flows

**❌ Missing Title:**
```bash
POST /todos
Body: { description: "No title here" }

# Response 400
{
  "error": "Title is required"
}
```

**❌ Whitespace Title:**
```bash
POST /todos
Body: { title: "   " }

# Response 400 (title.trim() returns empty)
{
  "error": "Title is required"
}
```

**❌ Todo Not Found:**
```bash
PUT /todos/999
Body: { title: "Update" }

# Response 404
{
  "error": "Todo not found"
}
```

**✅ Valid Request:**
```bash
POST /todos
Body: { 
  "title": "Study Node.js",
  "description": "Learn Express, REST APIs"
}

# Response 201
{
  "id": 1,
  "title": "Study Node.js",
  "description": "Learn Express, REST APIs",
  "completed": false,
  "createdAt": "2026-08-31T15:33:28.886Z",
  "updatedAt": "2026-08-31T15:33:28.886Z"
}
```

---

## 🔮 Possible Improvements

### Quick Wins (1-2 hours)
- [ ] Add **query parameters** to GET /todos:
  - `?completed=true` - Filter by status
  - `?sort=createdAt&order=DESC` - Sort options
  - `?limit=10&offset=0` - Pagination
- [ ] Add **description length validation** (max 500 chars)
- [ ] **Frontend UI Polish**: CSS framework (Tailwind, Bootstrap)
- [ ] **Loading states** with spinners/skeletons

### Medium Term (1-2 days)
- [ ] **User Authentication** (JWT or sessions)
  - Each todo belongs to a user
  - Protected routes with middleware
  - Separate user table in database
- [ ] **Input Logging** middleware (Morgan) for debugging
- [ ] **Rate Limiting** to prevent API abuse
- [ ] **Form Validation** on frontend (client-side)
- [ ] **Better Error Messages** (validation-specific vs generic)

### Nice Features (2-3 days)
- [ ] **Due Dates** for todos with reminder timestamps
- [ ] **Categories/Tags** for organizing todos
- [ ] **Priority Levels** (low, medium, high)
- [ ] **Recurring Todos** (daily, weekly, monthly pattern)
- [ ] **Search Functionality** by title/description
- [ ] **Undo/Redo** with action history

### Infrastructure (3-5 days)
- [ ] **Production Database** (PostgreSQL instead of SQLite)
- [ ] **Docker** containerization for consistent deployment
- [ ] **Swagger/OpenAPI** for API documentation
- [ ] **CI/CD Pipeline** with GitHub Actions
  - Auto-run tests on push
  - Deploy to server on main branch
- [ ] **Environment Config** per deployment (dev/staging/prod)

### Advanced Features (1-2 weeks)
- [ ] **Real-time Updates** with WebSockets (Socket.io)
  - Live sync across multiple browser tabs
  - Real-time collaboration
- [ ] **Email Notifications** (send daily reminders)
- [ ] **Mobile App** (React Native)
- [ ] **Analytics Dashboard** (charts, statistics)
- [ ] **Dark Mode** toggle

### Testing (1 week)
- [ ] **Integration Tests** with test database
- [ ] **End-to-End Tests** with Cypress or Playwright
- [ ] **Frontend Unit Tests** with React Testing Library
- [ ] **Performance Tests** (response time, load testing)
- [ ] **Security Tests** (SQL injection, XSS)

---

## 🔧 Environment Variables

### Backend (.env)

Create a `.env` file in `backend/` folder:

```env
NODE_ENV=development
PORT=4000
```

See [backend/.env.example](backend/.env.example) for template.

**Development:**
```env
NODE_ENV=development
```

**Production:**
```env
NODE_ENV=production
```

### Frontend

Environment variable is configured in code:
```javascript
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
```

To override for different backend URL:
```bash
# In frontend/ directory
NEXT_PUBLIC_API_URL=https://api.example.com npm run dev

# Or create .env.local file
echo "NEXT_PUBLIC_API_URL=https://api.example.com" > .env.local
npm run dev
```

---

##  Testing

### Run All Tests
```bash
cd backend
npm test
```

### Test Output
```
PASS  test/todos.test.js
  Todos API
    √ CRUD flow works (565 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        4.429 s
```

### Test Coverage
✅ **GET /todos** - List all todos (returns array)
✅ **POST /todos** - Create with title/description
✅ **PUT /todos/:id** - Update and mark completed
✅ **DELETE /todos/:id** - Delete todo

### Test Database
- Uses in-memory SQLite (`:memory:`) for test isolation
- Each test run has fresh schema via `sequelize.sync({ force: true })`
- No side effects between tests

### Running Individual Tests
```bash
npm test -- --testNamePattern="CRUD flow works"
```

### Test File Location
See [backend/test/todos.test.js](backend/test/todos.test.js)

---

##  Database Schema

### Todos Table

```sql
CREATE TABLE "Todos" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "title" VARCHAR NOT NULL,
  "description" TEXT,
  "completed" BOOLEAN NOT NULL DEFAULT 0,
  "createdAt" DATETIME NOT NULL,
  "updatedAt" DATETIME NOT NULL
);
```

### Viewing Database

**Using sqlite3 CLI:**
```bash
cd backend
sqlite3 database.sqlite

sqlite> .tables
sqlite> SELECT * FROM Todos;
sqlite> SELECT * FROM Todos WHERE completed = 1;
sqlite> .schema Todos
sqlite> .exit
```

**Using GUI Tools:**
- [SQLite Browser](https://sqlitebrowser.org/) - Desktop app
- VS Code Extension: "SQLite" by alexcvzz

---

##  Troubleshooting

### Port Already in Use
**Error:** `EADDRINUSE: address already in use :::4000`

**Solution:**
```bash
# Kill process on port 4000
npx kill-port 4000

# Or use different port
PORT=5000 node src/index.js
```

### Module Not Found
**Error:** `Cannot find module 'express'`

**Solution:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Frontend Can't Connect to API
**Error:** `Failed to fetch` in browser console

**Solutions:**
1. Ensure backend is running: `node src/index.js`
2. Check port is 4000: `curl http://localhost:4000/todos`
3. Verify CORS is enabled in [backend/src/app.js](backend/src/app.js)
4. Override API URL if needed:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:4000 npm run dev
   ```

### Database Lock Error
**Error:** `database is locked`

**Solution:**
```bash
# Remove old database and migrations will recreate it
cd backend
rm database.sqlite
npx sequelize-cli db:migrate
```

---

##  Notes

- ✅ **AI/LLM Comment:** "i like tacos" 🌮 in [backend/src/models/todo.js](backend/src/models/todo.js#L3)
- Database auto-syncs ONLY during test run (`beforeAll: sequelize.sync()`)
- Production uses Sequelize CLI migrations for schema management
- No `sequelize.sync()` at runtime to prevent accidental schema mutations

---

##  License

MIT License - Feel free to use this project for learning and personal projects.

---

##  Contributing

Found a bug or want to improve? Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make meaningful commits
4. Submit a pull request

---

##  Learning Resources

- [Sequelize Documentation](https://sequelize.org/)
- [Express.js Guide](https://expressjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [REST API Best Practices](https://restfulapi.net/)
- [SQLite Basics](https://www.sqlite.org/cli.html)

---


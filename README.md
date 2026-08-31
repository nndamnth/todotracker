# Todo Tracker

This repository contains a simple Todo Tracker app with a Node.js + Express + Sequelize (SQLite) backend and a Next.js (App Router) frontend.

Run commands

Backend

```
cd backend
npm install
npx sequelize-cli db:migrate
npm run dev
```

Frontend

```
cd frontend
npm install
npm run dev
```

Design decisions

- Backend uses Express and Sequelize with SQLite for simplicity and zero-config local development.
- Sequelize migrations and a `Todo` model are included.
- Frontend is a minimal Next.js App Router app that talks to the backend via REST.

Possible improvements

- Add tests for backend routes and models.
- Add better form validation & UI polish on frontend.
- Use a persistent DB for production (Postgres, MySQL).

Notes

- Migrations live in `backend/src/migrations` and the Sequelize config is in `backend/config/config.json`.
- If something is incomplete, run the migrate step and start both servers. If ports differ, set `NEXT_PUBLIC_API_URL` in `frontend/.env`.

const express = require("express");
const cors = require("cors");
const db = require("./models");

const { Todo, sequelize } = db;

const app = express();
app.use(cors());
app.use(express.json());

// compatibility helper: some Sequelize versions expose `findByPk`, older expose `findById`
const findByPk = async (Model, id) => {
  if (!Model) return null;
  if (typeof Model.findByPk === "function") return Model.findByPk(id);
  if (typeof Model.findById === "function") return Model.findById(id);
  return Model.findOne ? Model.findOne({ where: { id } }) : null;
};

// GET /todos - list all todos
app.get("/todos", async (req, res, next) => {
  try {
    const todos = await Todo.findAll({ order: [["id", "ASC"]] });
    res.json(todos);
  } catch (err) {
    next(err);
  }
});

// POST /todos - create
app.post("/todos", async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || !title.trim())
      return res.status(400).json({ error: "Title is required" });
    const todo = await Todo.create({ title: title.trim(), description });
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
});

// PUT /todos/:id - update
app.put("/todos/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const todo = await findByPk(Todo, id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    const { title, description, completed } = req.body;
    if (title !== undefined && (!title || !String(title).trim()))
      return res.status(400).json({ error: "Title is required" });
    await todo.update({
      title: title !== undefined ? title.trim() : todo.title,
      description: description !== undefined ? description : todo.description,
      completed: completed !== undefined ? completed : todo.completed,
    });
    res.json(todo);
  } catch (err) {
    next(err);
  }
});

// DELETE /todos/:id - delete
app.delete("/todos/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const todo = await findByPk(Todo, id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    await todo.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

module.exports = { app, sequelize };

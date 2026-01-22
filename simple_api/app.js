const express = require("express");
const app = express();

app.use(express.json());

let todos = [];
let nextId = 1;

app.post("/todos", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const todo = {
    id: nextId++,
    title,
    completed: false
  };

  todos.push(todo);
  res.status(201).json(todo);
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.get("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.json(todo);
});


app.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  const { title, completed } = req.body;

  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  const deletedTodo = todos.splice(index, 1);
  res.json(deletedTodo[0]);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 TODO API running at http://localhost:${PORT}`);
});

const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory storage
let todos = [];

// Routes
app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const newTodo = req.body;
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.get('/todos/:id', (req, res) => {
    const { id } = req.params;
    
    let todoIndex = todos.findIndex(todo => todo.id == id);
    if (todoIndex !== -1) {
        res.status(200).json(todos[todoIndex]);
    } else {
        res.status(404).send('Todo not found');
    }
});

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    let todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Todo not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

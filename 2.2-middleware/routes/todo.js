const express = require('express');
const router = express.Router();
const {Todo} = require('../models');
const fileMiddleware = require('../middleware/file')


const stor = {
    todo: [],
};

[1, 2, 3].map(el => {
    const newTodo = new Todo(`todo ${el}`, `desc todo ${el}`);
    stor.todo.push(newTodo);
});

router.get('/', (req, res) => {
    const {todo} = stor;
    res.json(todo);
});

router.get('/:id', (req, res) => {
    const {todo} = stor;
    const {id} = req.params;
    const idx = todo.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.json(todo[idx]);
    } else {
        res.status(404);
        res.json("todo | not found");
    }
});

router.post('/', (req, res) => {
    const {todo} = stor;
    const {title, desc} = req.body;

    const newTodo = new Todo(title, desc);
    todo.push(newTodo);

    res.json(newTodo);
});

router.put('/:id', (req, res) => {
    const {todo} = stor;
    const {title, desc} = req.body;
    const {id} = req.params;
    const idx = todo.findIndex(el => el.id === id);

    if (idx !== -1) {
        todo[idx] = {
            ...todo[idx],
            title,
            desc,
        };
        res.json(todo[idx]);
    } else {
        res.status(404);
        res.json("todo | not found");
    }
});

router.delete('/:id', (req, res) => {
    const {todo} = stor;
    const {id} = req.params;
    const idx = todo.findIndex(el => el.id === id);

    if (idx !== -1) {
        todo.splice(idx, 1);
        res.json(true);
    } else {
        res.status(404);
        res.json("todo | not found");
    }
});


// загрузка файлов
router.post('/upload-img', fileMiddleware.single('cover-img'), (req, res) => {
    if (req.file) {
        const {path} = req.file;
        console.log(path);

        res.json(path);
    } else {
        res.json(null);
    }
});

module.exports = router;


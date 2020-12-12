const express = require('express');
const router = express.Router();
const Todo = require('../../models/todo');

router.get('/', async (req, res) => {
    const todo = await Todo.find().select('-__v');
    res.json(todo);
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const todo = await Todo.findById(id).select('-__v');
        res.json(todo);
    } catch (e) {
        console.error(e);
        res.status(404).json("todo | not found");
    }
});

router.post('/', async (req, res) => {
    const {title, desc} = req.body;

    const newTodo = new Todo({
        title: 'title...',
        desc: 'desc...',
    });

    try {
        await newTodo.save();
        res.json(newTodo);
    } catch (e) {
        console.error(e);
        res.status(500).json();
    }
});

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {title, desc} = req.body;

    try {
        await Todo.findByIdAndUpdate(id, {title, desc});
        res.redirect(`/api/todo/${id}`);
    } catch (e) {
        console.error(e);
        res.status(500).json();
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        await Todo.deleteOne({_id: id});
        res.json(true);
    } catch (e) {
        console.error(e);
        res.status(500).json();
    }
});

module.exports = router;

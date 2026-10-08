const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./db');
const Todo = require('./models/Todo');

connectDB();
app.use(express.json());

app.get('/all-todo', async (req, res) => {

    try {
        const tasks = await Todo.find();
        if (tasks.length === 0) {
            return res.status(400).json({ message: "No Tasks found" });
        }

        res.status(200).json(tasks);


    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }

})


app.post('/add-todo', async (req, res) => {

    try {
        const { title } = req.body;
        if (title.trim() === '') {
            return res.status(400).json({ message: "Enter a valid task" });
        }

        const newTodo = await Todo.create({
            title: title
        })

        res.status(201).json({ message: "Todo created Succesfully", newTodo });


    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }

})

app.put('/update-todo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(id, {
            title: title,
            completed: completed
        }, { new: true });

        if (!updatedTodo) {
            return res.status(400).json({ message: "Todo not found" });
        }

        res.status(201).json({ message: "Your todo updated successfully", updatedTodo });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
})


app.patch('/update-todo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedTodo) {
            return res.status(400).json({ message: "Todo not found" });
        }

        res.status(201).json({ message: "Your todo updated successfully", updatedTodo });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
})

app.delete('/delete-todo/:id', async (req, res) => {

    try {
        const { id } = req.params;

        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(400).json({ message: "Todo not found" });
        }

        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }

})



const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running to ${PORT}`);

});
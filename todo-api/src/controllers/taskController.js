const Task = require('../models/taskModel');

// Get all tasks
exports.getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

// Add a task
exports.addTask = async (req, res) => {
    const { title } = req.body;
    const newTask = new Task({ title });
    await newTask.save();
    res.json(newTask);
};

// Edit a task
exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, { title }, { new: true });
    res.json(updatedTask);
};

// Delete a Task
exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndUpdate(id);
    res.json({ message: 'Task deleted' });
};
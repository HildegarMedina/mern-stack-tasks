//Modules
const express = require("express");
const router = express.Router();

const Task = require("../models/task");

//Get tasks
router.get("/", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

//Get task
router.get("/:id", async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
});

//Add
router.post("/", async (req, res) => {
    const {title, description} = req.body;
    const task = new Task({title, description});
    await task.save();
    res.json({status: "Task saved"});
});

//Edit
router.put("/:id", async (req, res) => {
   const {title, description} = req.body;
   const newTask = {title, description};
   await Task.findByIdAndUpdate(req.params.id, newTask);
   res.json({status: "Task updated"});
});

//Delete
router.delete("/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({status: "Task deleted"});
});

//Export
module.exports = router;
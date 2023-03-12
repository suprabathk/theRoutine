const express = require("express")
const router = express.Router()
const { Task, User } = require("../models")

const userID = 1;

router.get("/", async (req, res) => {
    const allTasks = await Task.getTasks(userID);
    return res.json(allTasks)
})

router.post("/", async (req, res) => {
    const task = await Task.addTask({
        title: req.body.title,
        startTime: new Date(),
        endTime: new Date(),
        userID: userID
    })
    return res.json(task)
})

router.delete("/:id", async (req, res) => {
    const status = await Task.removeTask({
        id: req.params.id,
        userID: userID
    })
    return res.json({ success: status === 1 })
})

router.put("/:id", async (req, res) => {
    const status = await Task.updateTask({
        title: req.body.title,
        id: req.params.id,
        userID: userID
    })
    return res.json({ success: status === 1 })
})

module.exports = router
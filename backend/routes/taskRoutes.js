const express = require("express");
const router = express.Router()
const { Task, User } = require("../models")

const userID = 1;

router.get("/", async (req, res) => {
    const allTasks = await Task.getTasks(userID);
    return res.status(200).json(allTasks)
})

router.get("/:id", async (req, res) => {
    const task = await Task.getTask({ userID, id: req.params.id })
    return res.json(task)
})

router.post("/", async (req, res) => {
    const startTime = new Date(req.body.startTime)
    const endTime = new Date(req.body.endTime)

    const allTasks = await Task.getTasks(userID);
    const reservedSlots = []
    for (let task of allTasks) {
        reservedSlots.push([task.startTime, task.endTime])
    }
    empty = true
    occupiedBy = 01
    for (let slot of reservedSlots) {
        if (startTime > endTime) {
            empty = false
            occupiedBy = slot.id
            break
        }
        if ((slot[0] <= startTime) && (startTime < slot[1])) {
            empty = false
            occupiedBy = slot.id
            break
        }
        if ((slot[0] < endTime) && (endTime <= slot[1])) {
            empty = false
            occupiedBy = slot.id
            break
        }
        if (startTime < slot[0] && slot[1] < endTime) {
            empty = false
            occupiedBy = slot.id
            break
        }
    }
    if (empty) {
        const task = await Task.addTask({
            title: req.body.title,
            startTime: startTime,
            endTime: endTime,
            userID: userID
        })
        return res.status(200).json({ occupied: false, task: task })
    } else {
        return res.status(400).json({ occupied: true, occupiedBy: occupiedBy })
    }
})

router.delete("/:id", async (req, res) => {
    const status = await Task.removeTask({
        id: req.params.id,
        userID: userID
    })
    return res.status(200).json({ success: status === 1 })
})

router.put("/:id", async (req, res) => {
    const status = await Task.updateTask({
        title: req.body.title,
        id: req.params.id,
        userID: userID
    })
    return res.status(200).json({ success: status === 1 })
})

module.exports = router
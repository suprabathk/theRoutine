const express = require("express");
const { Task } = require("../models")
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

router.use(requireAuth)

router.get("/", async (req, res) => {
    try {
        const allTasks = await Task.getTasks(req.user);
        return res.status(200).json(allTasks)
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const task = await Task.getTask({ userID: req.user, id: req.params.id })
        return res.json(task)
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error })
    }
})

router.post("/", async (req, res) => {
    let empty = true
    let occupiedBy = null
    let occupiedByName = null
    try {
        const startTime = new Date(req.body.startTime)
        const endTime = new Date(req.body.endTime)

        const allTasks = await Task.getTasks(req.user);
        const reservedSlots = []
        for (let task of allTasks) {
            reservedSlots.push([task.startTime, task.endTime, task.id])
        }

        if (startTime >= endTime) {
            empty = false
        } else {
            for (let slot of reservedSlots) {
                if ((slot[0] <= startTime) && (startTime < slot[1])) {
                    empty = false
                    occupiedBy = slot[2]
                    break
                }
                if ((slot[0] < endTime) && (endTime <= slot[1])) {
                    empty = false
                    occupiedBy = slot[2]
                    break
                }
                if (startTime < slot[0] && slot[1] < endTime) {
                    empty = false
                    occupiedBy = slot[2]
                    break
                }
            }
        }
        if (empty) {
            const task = await Task.addTask({
                title: req.body.title,
                startTime: startTime,
                endTime: endTime,
                userID: req.user
            })
            return res.status(200).json({ occupied: false, task: task })
        } else {
            occupiedByName = await Task.getTask({ userID: req.user, id: occupiedBy })
            return res.status(400).json({ occupied: true, occupiedBy: occupiedBy, occupiedByName: occupiedByName })
        }
    } catch (error) {
        console.log(error);
        occupiedByName = await Task.getTask({ userID: req.user, id: occupiedBy })
        return res.status(400).json({ occupied: true, occupiedBy: occupiedBy, occupiedByName: occupiedByName })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const status = await Task.removeTask({
            id: req.params.id,
            userID: req.user
        })
        return res.status(200).json({ success: status === 1 })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const status = await Task.updateTask({
            title: req.body.title,
            id: req.params.id,
            userID: req.user
        })
        return res.status(200).json({ success: status === 1 })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error })
    }
})

module.exports = router
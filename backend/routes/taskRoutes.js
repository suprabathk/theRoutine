const express = require("express")
const router = express.Router()


router.get("/", (req, res) => {
    return res.json({ msg: "Get All Tasks" })
})

router.post("/", (req, res) => {
    return res.json({ msg: "Create new task" })
})

router.delete("/:id", (req, res) => {
    return res.json({ msg: "Delete Task" })
})

router.put("/:id", (req, res) => {
    return res.json({ msg: "Update Task" })
})

module.exports = router
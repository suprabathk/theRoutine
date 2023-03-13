const express = require("express");
const router = express.Router()
const { User } = require("../models")

router.get("/", async (req, res) => {
    try {
        const user = await User.getUsers();
        return res.status(200).json({ user })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error })
    }
})

router.post("/", async (req, res) => {
    try {
        const user = await User.addUser({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        return res.status(200).json({ user })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error })
    }
})

module.exports = router

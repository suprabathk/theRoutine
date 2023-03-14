require("dotenv").config()
const express = require("express");
const router = express.Router()
const { User } = require("../models")
const bcrypt = require("bcrypt")
const validator = require("validator")
const jwt = require("jsonwebtoken")

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: '3d' })
}

router.post("/login", async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json("All fields must be entered");
    }
    if (!validator.isEmail(req.body.email)) {
        return res.status(400).json("Email must be valid");
    }
    try {
        const user = await User.getUser(req.body.email);
        if (!user) {
            return res.status(400).json("User does not exist");
        }
        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) {
            return res.status(400).json(`Invalid password`);
        }
        const token = createToken(user.id)
        return res.status(200).json({ token })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error })
    }
})

router.post("/signup", async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json("All fields must be entered");
    }
    if (!validator.isEmail(req.body.email)) {
        return res.status(400).json("Email must be valid");
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        const user = await User.addUser({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass
        });
        const token = createToken(user.id)
        return res.status(200).json({ token })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error })
    }
})

module.exports = router

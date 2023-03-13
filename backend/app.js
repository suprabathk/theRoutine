const express = require("express");
const cors = require("cors")
const taskRoutes = require("./routes/taskRoutes")
const userRoutes = require("./routes/userRoutes")
const app = express();

app.use(cors())

app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

app.listen(process.env.PORT || 8080, () => {
    console.log(`Started server on ${process.env.PORT || 8080}`);
});
const express = require("express");
const { userRouter } = require("./router/user");
const { coursesRouter } = require("./router/courses");

const app = express();
const PORT = 3000;

app.use("/user", userRouter);
app.use("/courses", coursesRouter);

app.listen(PORT);
const express = require("express");
const { userRouter } = require("./router/user");
const { adminRouter } = require("./router/admin");
const { coursesRouter } = require("./router/courses");
const { mongoose } = require("mongoose");

mongoose.connect("mongodb+srv://18oo18oo12:KnNLJWqryJnpOheW@cluster0.qk8pt.mongodb.net/course-marketplace")

const app = express();
const PORT = 3000;

app.use("api/v1/user", userRouter);
app.use("api/v1/admin", adminRouter);
app.use("api/v1/courses", coursesRouter);

app.listen(PORT);
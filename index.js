const express = require("express");
const { userRouter } = require("./router/user");
const { adminRouter } = require("./router/admin");
const { coursesRouter } = require("./router/courses");
const { mongoose } = require("mongoose");
require("dotenv").config();


console.log(process.env.MONGO_DB_CONNECTION_STRING);
(async () => await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING))()
const app = express();
const PORT = 3000;

app.use("api/v1/user", userRouter);
app.use("api/v1/admin", adminRouter);
app.use("api/v1/courses", coursesRouter);

app.listen(PORT);
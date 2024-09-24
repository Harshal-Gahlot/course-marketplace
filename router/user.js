const { Router } = require("express");
const adminModel = require("../db/userSchema")
const userRouter = Router();

userRouter.post("/signup", (req, res) => {
    res.send("ok");
});

userRouter.post("/login", (req, res) => {
    res.send("ok");
});

userRouter.get("/purchases", (req, res) => {
    res.send("ok");
});

module.exports = { userRouter };
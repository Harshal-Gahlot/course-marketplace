const { Router } = require("express");
const adminModel = require("../db/adminSchema");
const adminRouter = Router()

adminRouter.post("/login", (req, res) => {
    res.send("endpoint")
});

adminRouter.post("/signup", (req, res) => {
    res.send("endpoint")
});

adminRouter.post("/course", (req, res) => {
    res.send("endpoint")
});

adminRouter.delete("/delete", (req, res) => {
    res.send("endpoint")
});

adminRouter.put("/course", (req, res) => {
    res.send("endpoint")
});

adminRouter.get("/course/all", (req, res) => {
    res.send("endpoint")
})

module.exports = { adminRouter }
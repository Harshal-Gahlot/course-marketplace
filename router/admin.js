const adminModel = require("../db/adminSchema");
const auth = require("../auth/userAuth");
const { Router } = require("express");
const adminRouter = Router();

adminRouter.post("/login", (req, res) => {
    res.send("endpoint");
});

adminRouter.post("/signup", (req, res) => {
    res.send("endpoint");
});

adminRouter.post("/", auth, (req, res) => {
    res.send("endpoint");
});

adminRouter.delete("/", auth, (req, res) => {
    res.send("endpoint");
});

adminRouter.put("/", auth, (req, res) => {
    res.send("endpoint");
});

adminRouter.get("/all", auth, (req, res) => {
    res.send("endpoint");
});

module.exports = { adminRouter };
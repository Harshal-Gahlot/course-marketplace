const { Router } = require("express");
const coursesRouter = Router();

coursesRouter.post("/buy", (req, res) => {
    res.send("ok");
});

coursesRouter.get("/courses", (req, res) => {
    res.send("ok");
});

module.exports = { coursesRouter };
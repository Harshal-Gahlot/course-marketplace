const express = require("express");
const userAuth = require("../auth/userAuth");
const { PurchasesModel } = require("../db/purchasesSchema");
const { CourseModel } = require("../db/courseSchema");

const coursesRouter = express.Router();
coursesRouter.use(express.json());

coursesRouter.post("/buy", userAuth, async (req, res) => {
    const userId = req.userId
    const courseId = req.body.courseId

    await PurchasesModel.create({
        courseId,
        userId
    })

    res.send("You have successivly bought the course!")
});

coursesRouter.get("/all", async (req, res) => {
    const courses = await CourseModel.find({});
    res.send(courses);
});

module.exports = { coursesRouter };
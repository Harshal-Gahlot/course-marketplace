const { AdminModel } = require("../db/adminSchema");
const { CourseModel } = require("../db/courseSchema");
const adminAuth = require("../auth/adminAuth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const express = require("express");
const { Router } = require("express");

const adminRouter = Router();
adminRouter.use(express.json());

adminRouter.post("/signup", async (req, res) => {

    const bodySchema = z.object({
        "email": z.string().max(100),
        "password": z.string().max(100).min(6),
        "firstname": z.string().max(100).min(3),
        "lastname": z.string().max(100).min(1)
    }).strict();

    const { success, error } = bodySchema.safeParse(req.body);
    req.body.password = await bcrypt.hash(req.body.password, 5);

    if (!success) {
        res.json({
            Invalid_Input: error.issues[0].message
        });
        return;
    }

    try {
        await AdminModel.create(req.body);
    } catch (e) {
        if (e.code === 11000) {
            res.send("USER ALREADY EXIST WITH THIS EMAIL!");
        } else {
            console.error(e);
            res.send(e);
        }
    }
    res.send("YOU SIGN UP SUCCESSFULLY!");
});

adminRouter.post("/login", async (req, res) => {
    const bodySchema = z.object({
        "email": z.string().email().max(100),
        "password": z.string().min(6).max(50)
    }).strict();

    const { success, error } = bodySchema.safeParse(req.body);

    if (!success) {
        res.json({
            Invalid_Input: error.issues[0].message
        });
        return;
    }

    const userEntry = await AdminModel.findOne({ "email": req.body.email });
    if (!userEntry) {
        res.send("Invaild Email or Password");
        return;
    }
    const isCorrectPasswored = bcrypt.compare(req.body.password, userEntry.password);
    if (!isCorrectPasswored) {
        res.send("Incorrect Password, Try again!");
        return;

    }
    const token = jwt.sign({ id: userEntry._id }, process.env.ADMIN_JWT_SECRET);
    res.send(token);
});

adminRouter.post("/course", adminAuth, async (req, res) => {
    creatorId = req.userId;
    const { title, description, imageURL, prise } = req.body;

    await CourseModel.create({
        title,
        description,
        prise,
        imageURL,
        creatorId
    });

    res.send("Course Created!");
});

adminRouter.put("/course", adminAuth, async (req, res) => {
    creatorId = req.userId;
    const { courseId, title, description, imageURL, prise } = req.body;

    console.log('creatorId', creatorId);
    console.log('courseId', courseId);
    const updated = await CourseModel.updateOne(
        {
            _id: courseId,
            creatorId: creatorId // This ensures that a creator can only update a course created by them.
        },
        {
            title,
            description,
            prise,
            imageURL
        });

    if (updated.matchedCount === 0) {
        res.status(403).send("Fail to update the course, perhaps you are trying to update a course you are not the creator of.");
        return;
    }
    res.send("Course Updated!");

});

adminRouter.get("/course", adminAuth, async (req, res) => {
    creatorId = req.userId;
    const courses = await CourseModel.find({ "creatorId": creatorId });

    res.send(courses);
});

adminRouter.delete("/course", adminAuth, (req, res) => {
    res.send("endpoint");
});

module.exports = { adminRouter };
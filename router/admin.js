const { AdminModel } = require("../db/adminSchema");
const auth = require("../auth/userAuth");
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

adminRouter.post("/course", auth, (req, res) => {
    res.send("endpoint");
});

adminRouter.delete("/course", auth, (req, res) => {
    res.send("endpoint");
});

adminRouter.put("/course", auth, (req, res) => {
    res.send("endpoint");
});

adminRouter.get("/course", auth, (req, res) => {
    res.send("endpoint");
});

module.exports = { adminRouter };
const { UserModel } = require("../db/userSchema");
const auth = require("../auth/userAuth");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const express = require("express");
const { Router } = require("express");

const userRouter = Router();
userRouter.use(express.json());

userRouter.post("/signup", async (req, res) => {

    const bodySchema = z.object({
        "email": z.string().max(100),
        "password": z.string().max(100).min(6),
        "firstname": z.string().max(100).min(3),
        "lastname": z.string().max(100).min(1)
    }).strict();

    const { success, error } = bodySchema.safeParse(req.body);

    if (!success) {
        res.json({
            Invalid_Input: error.issues[0].message
        });
        return;
    }

    try {
        await UserModel.create(req.body);
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

userRouter.post("/login", async (req, res) => {
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

    const userEntry = await UserModel.findOne({ "email": req.body.email });
    if (!userEntry) {
        res.send("No user with this email");
        return;
    }
    if (userEntry.password !== req.body.password) {
        res.send("Incorrect Password");
    }
    // Qn directly passing id not within {} i.e. as obj Sol: yes then we can directly assess it w/o doing .id
    const token = jwt.sign({ id: userEntry._id }, process.env.USER_JWT_SECRET);
    res.send(token);
});

userRouter.get("/purchases", auth, (req, res) => {
    res.send("To be developed");
});

module.exports = { "userRouter": userRouter };
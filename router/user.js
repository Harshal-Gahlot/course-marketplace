const { UserModel } = require("../db/userSchema");
const auth = require("../auth/userAuth");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const express = require("express"); // Qn is it reqired?
const { Router } = require("express");

const userRouter = Router();
userRouter.use(express.json());

userRouter.post("/signup", async (req, res) => {

    const userData = {
        "email": req.body.email,
        "password": req.body.password,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    };

    try {
        await UserModel.create(userData);
    } catch (e) {
        if (e.code === 110000) {
            res.send("USER ALREADY EXIST WITH THIS EMAIL!");
        } else {
            console.error(e);
            res.send(e);
        }
    }
    res.send("YOU SIGN UP SUCCESSFULLY!");
});

userRouter.post("/login", async (req, res) => {
    userData = {
        "email": req.body.email,
        "password": req.body.password
    };
    
    const isValidUser = await UserModel.findOne({"email": userData.email});
    if (!isValidUser) {
        res.send("Sorry, no user with this email and password");
        return;
    }
    // Qn: Will this work withoug toString(); Qn directly passing id not within {} i.e. as obj
    const token = jwt.sign({ id: isValidUser._id.toString() }, process.env.USER_JWT_SECRET)
    res.send(token)
});

userRouter.get("/purchases", auth, (req, res) => {
    res.send("To be developed");
});

console.log("exporting userRouter...");
module.exports = { "userRouter": userRouter };
console.log("exported userRouter");
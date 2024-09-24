const { AdminModel } = require("../db/adminSchema");
const auth = require("../auth/userAuth");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Qn now that I imported .env in index before this file, is it required?
const express = require("express"); // Qn is it required?
const { Router } = require("express");
const adminRouter = Router();

adminRouter.use(express.json());

adminRouter.post("/signup", async (req, res) => {

    const userData = {
        "email": req.body.email,
        "password": req.body.password,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    };

    try {
        await AdminModel.create(userData);
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

adminRouter.post("/login", async (req, res) => {
    const userData = {
        "email": req.body.email,
        "password": req.body.password
    };
    const isValidUser = await AdminModel.findOne({ "email": userData.email });
    if (!isValidUser) {
        res.send("Invaild Email or Password");
        return;
    }
    const token = jwt.sign({ id: isValidUser._id.toString() }, process.env.ADMIN_JWT_SECRET)
    res.send(token)
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
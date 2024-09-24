const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const adminSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstname: String,
    lastname: String
});


const adminModel = mongoose.model("admin", adminSchema);

{}
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CourseSchema = new Schema({
    title: String,
    description: String,
    prise: Number,
    imageURL: String,
    creator: ObjectId
});

const CourseModel = mongoose.model("course", CourseSchema);

module.exports = { CourseModel }
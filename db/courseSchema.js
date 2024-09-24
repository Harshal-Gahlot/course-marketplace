const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const courseSchema = new Schema({
    title: String,
    description: String,
    prise: Number,
    imageURL: String,
    creator: ObjectId
});


const courseModel = mongoose.model("course", courseSchema);

module.exports = { courseModel }
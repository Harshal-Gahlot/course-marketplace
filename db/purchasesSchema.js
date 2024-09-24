const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const purchasesSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId
});

const purchasesModel = mongoose.model("purchases", purchasesSchema);

module.exports = { purchasesModel }
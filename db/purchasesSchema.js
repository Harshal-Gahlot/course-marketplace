const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PurchasesSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId
});

const PurchasesModel = mongoose.model("purchases", PurchasesSchema);

module.exports = { PurchasesModel }
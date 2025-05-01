const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    subName: {
        type: String,
        required: true,
    },
    subId: {
        type: Number,
        required: true,
    }
});

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
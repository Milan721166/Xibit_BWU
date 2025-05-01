const mongoose = require("mongoose");

const sub = new mongoose.Schema({
    subName: {
        type: String,
        required: true,
    },
    subId: {
        type: Number,
        required: true,
    }
});

const Subject = mongoose.model("Subject", Subject);

module.exports = Subject;
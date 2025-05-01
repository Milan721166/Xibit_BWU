const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
    {
        subName: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true // automatically adds createdAt and updatedAt fields
    }
);

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;

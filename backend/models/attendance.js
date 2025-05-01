const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: () => new Date().setHours(0, 0, 0, 0), // normalizes to midnight
    },
    status: {
        type: String,
        enum: ["present", "absent", "late", "excused"],
        default: "present",
        required: true
    },
    recordedAt: {
        type: Date,
        default: Date.now
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
    }
});

// Ensure a user can't have more than one attendance record per day
attendanceSchema.index({ user: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;

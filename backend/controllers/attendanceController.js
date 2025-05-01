const Attendance = require('../models/attendance');
const User = require('../models/user');

// Mark attendance
exports.markAttendance = async (req, res) => {
    try {
        const { userId, status } = req.body;

        if (!userId || !status) {
            return res.status(400).json({ message: 'User ID and status are required.' });
        }

        const normalizedDate = new Date();
        normalizedDate.setHours(0, 0, 0, 0);

        const attendance = await Attendance.findOneAndUpdate(
            { user: userId, date: normalizedDate },
            { status, recordedAt: new Date() },
            { upsert: true, new: true }
        ).populate('user', 'name email');

        return res.status(200).json({ message: 'Attendance marked successfully.', attendance });
    } catch (error) {
        console.error('Mark Attendance Error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Get current user's attendance (user must be authenticated)
exports.getUserAttendance = async (req, res) => {
    try {
        const userId = req.user._id; // assuming req.user is set by auth middleware

        const records = await Attendance.find({ user: userId }).sort({ date: -1 });

        return res.status(200).json(records);
    } catch (error) {
        console.error('Get User Attendance Error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Admin/teacher: Get attendance of all users
exports.getAllAttendance = async (req, res) => {
    try {
        const records = await Attendance.find()
            .populate('user', 'name email role')
            .sort({ date: -1 });

        return res.status(200).json(records);
    } catch (error) {
        console.error('Get All Attendance Error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {
    markAttendance,
    getUserAttendance,
    getAllAttendance
};

const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const authMiddleware = require('../middleware/authMiddleware'); // adjust path

// Mark attendance (any logged-in user or controlled by frontend)
router.post('/mark', attendanceController.markAttendance);

// Get current user's attendance (requires auth middleware to set req.user)
router.get('/my', authMiddleware, attendanceController.getUserAttendance);

// Admin/teacher: Get all users' attendance (requires auth + role check if needed)
router.get('/all', authMiddleware, attendanceController.getAllAttendance);

module.exports = router;

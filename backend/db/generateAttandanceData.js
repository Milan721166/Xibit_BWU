require('dotenv').config();
const mongoose = require('mongoose');
const Attendance = require('../models/attendance');
const User = require('../models/user');
const Subject = require('../models/subject');

const generateRandomData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect("mongodb+srv://milansahoo0204:5Tkr6Ec37m65lnih@cluster0.dymkbun.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to MongoDB');

        // Fetch all users and subjects
        const users = await User.find();
        const subjects = await Subject.find();

        if (users.length === 0 || subjects.length === 0) {
            console.log('❌ No users or subjects found. Please add users and subjects first.');
            return;
        }

        const statuses = ['present', 'absent', 'late', 'excused'];

        // Generate random attendance records
        const attendanceRecords = [];
        for (let i = 0; i < 50; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            const randomDate = new Date();
            randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 30)); // Random date in the past 30 days
            randomDate.setHours(0, 0, 0, 0); // Normalize to midnight

            attendanceRecords.push({
                user: randomUser._id,
                subject: randomSubject._id,
                date: randomDate,
                status: randomStatus,
            });
        }

        // Insert attendance records into the database
        await Attendance.insertMany(attendanceRecords);
        console.log('✅ Successfully inserted random attendance records.');
    } catch (error) {
        console.log(error);
        console.error('❌ Error generating random data:', error.message);
    } finally {
        mongoose.connection.close();
    }
};

generateRandomData();
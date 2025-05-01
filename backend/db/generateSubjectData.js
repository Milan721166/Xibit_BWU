require('dotenv').config();
const mongoose = require('mongoose');
const Subject = require('../models/subject');

const generateRandomSubjects = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect("mongodb+srv://milansahoo0204:5Tkr6Ec37m65lnih@cluster0.dymkbun.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to MongoDB');

        // Array of random subject names
        const subjectNames = [
            'Mathematics',
            'Physics',
            'Chemistry',
            'Biology',
            'History',
            'Geography',
            'English Literature',
            'Computer Science',
            'Economics',
            'Political Science'
        ];

        // Prepare subject data
        const subjects = subjectNames.map((name) => ({
            subName: name,
        }));

        // Insert subjects into the database
        await Subject.insertMany(subjects);
        console.log('✅ Successfully inserted random subject data.');
    } catch (error) {
        console.error('❌ Error generating subject data:', error.message);
    } finally {
        mongoose.connection.close();
    }
};

generateRandomSubjects();
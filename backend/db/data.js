const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { faker } = require('@faker-js/faker');
const connectDB = require('./db');
const User = require('../models/user'); // adjust path as needed

dotenv.config();

const generateRandomUsers = async () => {
    try {
        await connectDB();

        const users = [];

        for (let i = 0; i < 100; i++) {
            const name = faker.person.fullName();
            const email = faker.internet.email().toLowerCase();
            const password = await bcrypt.hash('password123', 10); // default password for all
            const role = 'user'; // student role

            users.push({
                name,
                email,
                password,
                role,
                token: '',
                createdAt: new Date()
            });
        }

        // Insert into DB
        await User.insertMany(users);
        console.log('✅ Successfully inserted 100 random student users.');
        process.exit();
    } catch (error) {
        console.error('❌ Error inserting users:', error.message);
        process.exit(1);
    }
};

generateRandomUsers();

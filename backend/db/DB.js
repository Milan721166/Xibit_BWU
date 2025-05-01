// filepath: c:\Users\INDIA\OneDrive\Desktop\texibition\Xibit_BWU\backend\db\db.js
const mongoose = require('mongoose');
const dotenv = require("dotenv")

dotenv.config();
const connectDB = async () => {
    const uri = "mongodb+srv://milansahoo0204:5Tkr6Ec37m65lnih@cluster0.dymkbun.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    if (!uri) {
        console.error('❌ MONGO_URI is not defined in the environment variables.');
        process.exit(1);
    }

    try {
        console.log('Connecting to MongoDB with URI:', uri); // Debugging log
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('✅ MongoDB connected successfully.');
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;

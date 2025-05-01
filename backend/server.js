require('dotenv').config();
const express = require('express');
const connectDB = require('./db/db');
const AuthRouter = require('./routes/auth');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware, routes, etc.
app.use(express.json());
app.use('/auth',AuthRouter)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

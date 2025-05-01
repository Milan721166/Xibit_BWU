require('dotenv').config();
const express = require('express');
const connectDB = require('./db/db');
const AuthRouter = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const app = express();
const cors = require('cors');


app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['*']
}));

// Connect to MongoDB
connectDB();

// Middleware, routes, etc.
app.use(express.json());
app.use('/auth', AuthRouter)
app.use('/userRoutes', userRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

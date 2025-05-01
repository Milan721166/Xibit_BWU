const User = require('../models/user'); // Adjust path if needed
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup controller
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        user.token = token;

        await user.save();

        // Send response without password
        const { password: _, ...userData } = user.toObject();
        res.status(201).json({ user: userData, token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Login controller
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate new token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        user.token = token;

        await user.save();

        // Send response without password
        const { password: _, ...userData } = user.toObject();
        res.status(200).json({ user: userData, token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.tokenRefresh=async(req,res)=>{
    try {
        const {token}=req.body;
        if(!token){
            res.status(400).json({
                error:"Token Not Found"

            })
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findById(decoded.userId);
        if(!user){
            res.status(400).json({
                error:"User Not Found"
            })
        }
        res.status(200).json({
            token:jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'7d'}),
            user:{
                name:user.name,
                email:user.email,
                role:user.role
            }
        })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
        
        
    }
}
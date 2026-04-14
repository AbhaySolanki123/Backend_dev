import user from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  );
};

export const signup = async (req, res) => {
    try{
        const { name, email, password } = req.body;
        const existingUser = await user.findOne({ email });
        if(existingUser){
            return res.status(400).json({ message: "User already exists" });
        }
        // hashing password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new user({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
        const token = generateToken(newUser._id);
        res.status(201).json({ 
            message: "User created successfully",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        
        const foundUser = await user.findOne({ email });
        if (!foundUser) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        
        const isPasswordValid = await bcrypt.compare(password, foundUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        
        // Generate JWT token
        const token = generateToken(foundUser._id);
        
        // Return user data (without password)
        res.json({ 
            message: "Login successful",
            token,
            user: {
                id: foundUser._id,
                name: foundUser.name,
                email: foundUser.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
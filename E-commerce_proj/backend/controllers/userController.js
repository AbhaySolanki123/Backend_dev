import User from "../models/user.js";
import bcrypt from "bcryptjs";

// Register User
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  try {
    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({ 
        message: "User registered successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    }
  } catch (error) {
    res.status(400).json({ message: "Error registering user" });
  }
};

// Get Users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};
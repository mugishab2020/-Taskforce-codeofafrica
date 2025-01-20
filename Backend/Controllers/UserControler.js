import User from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const { username, first_name, last_name, email, password } = req.body;

    if (!username || !first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email." });
    }
    const userbyUsername = await User.findOne({ username });
    if (userbyUsername) {
      return res
        .status(400)
        .json({ message: "User already exists with this username." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      first_name,
      last_name,
      email,
      password: hashedPassword,
      created_at: new Date(),
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully.", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user.", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }
    const token = jwt.sign(
      { id: user._id, first_name: user.first_name, last_name: user.last_name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful.", token, user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging in.", error: error.message });
  }
};

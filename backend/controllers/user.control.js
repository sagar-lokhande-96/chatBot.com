import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Import JWT
import config  from "dotenv";

// Load environment variables
config();

export const signUp = async (req, res) => {
  try {
    const { firstname, lastname, password, email } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        message: "User already exists!!!",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).json({
      message: "User created successfully!!!",
    });
  } catch (error) {
    console.error("Error in signUp function:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        message: "Invalid email !!!",
      });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password!!!",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ _id: existingUser._id }, config.JWT_USER_PASSWORD, { expiresIn: "1d" });

    // set the expires time for the cookie
    const cookieOptions = {
        expires : new Date(Date.now()+24*60*60*1000),
        httpOnly: true, // protect from XSS attacks
        secure: process.env.NODE_ENV === "production", // Set to true in production
        sameSites: "Strict" // to protect us from CSRF attacks
    }
    // Set the token in cookies
    res.cookie("JWT", token, cookieOptions);

    
    return res.status(200).json({
      message: "User logged in successfully", existingUser, token
    });
  } catch (error) {
    console.error("Error in logIn function:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Logout function
// This function clears the JWT cookie and sends a response to the client
// indicating that the user has been logged out successfully.
export const logOut = (req, res) => {
  try {
    res.clearCookie("JWT");
    return res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Error in logOut function:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

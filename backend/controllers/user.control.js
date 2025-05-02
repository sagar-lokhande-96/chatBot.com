import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  try {
    let { firstname,lastname, password, email } = req.body;
    let existingUser = await User.findOne({ email});
    if(existingUser){
        return res.status(401).json({
            message: "User already exists!!!",
        });
    }

    let hashedPassword = await bcrypt.hash(password, 15);
    let user = new User({
        firstname,
        lastname,
        email,
        password : hashedPassword,
    })
    await user.save()
    return res.status(200).json({
        message: "User created successfully!!!",
    })
  } catch (error) {
    console.log("error in signup function : ",error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const logIn = (req, res) => {
  console.log("Login function runs...");
};

export const logOut = (req, res) => {
  console.log("Logout function runs...");
};

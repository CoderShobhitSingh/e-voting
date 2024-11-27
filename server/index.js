const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const UserModel = require("./model/User");
// const MongoStore = require("connect-mongo");
// const session = require("express-session");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// Signup route
app.post("/signup", async (req, res) => {
  try {
    const { name, email, age, adhaar, password } = req.body;

    // Validate incoming data
    if (!name || !email || !age || !adhaar || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists (by email or Adhaar)
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { adhaar }],
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email or Adhaar already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user instance
    const newUser = new UserModel({
      name,
      email,
      age,
      adhaar,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Respond with the saved user (exclude sensitive information like password)
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        age: savedUser.age,
        adhaar: savedUser.adhaar,
      },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const { email, adhaar, password } = req.body;

    // Allow login with either email or Adhaar
    const user = await UserModel.findOne({ $or: [{ email }, { adhaar }] });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        res.json("Success");
      } else {
        res.status(401).json("Password does not match");
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: error.message });
  }
});

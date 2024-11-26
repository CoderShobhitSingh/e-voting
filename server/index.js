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

// app.use(session({
//   secret:process.env.SESSION_SECRET,
//   resave:false,
//   saveUninitialized:true,
//   store: MongoStore.create({
//     mongoUrl: process.env.MONGO_URI,
//   }),
//   cookie:{maxAge: 60 *60 *1000}
// }))

// Signup route
app.post("/signup", async (req, res) => {
  try {
    const { name, email, age, aadhaar, password } = req.body;

    const existingUser = await UserModel.findOne({
      $or: [{ email }, { aadhaar }],
    });
        if (existingUser) {
      return res.status(400).json({ error: "Email or Aadhaar already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = new UserModel({
      name,
      email,
      age,
      aadhaar,
      password: hashedPassword
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const { email, aadhaar, password } = req.body;

    // Allow login with either email or Aadhaar
    const user = await UserModel.findOne({ $or: [{ email }, { aadhaar }] });
    if (user) {
      const passwordMatch = await bcrypt.compare(password,user.password);
      if (passwordMatch) {
        res.json("Success");
      }
      else{
        res.status(401).json("Password does not match");
      }
    }
    }
    catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: error.message });
  }
});



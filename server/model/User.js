const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Name is mandatory
    },
    email: {
      type: String,
      required: true, // Email is mandatory
      unique: true, // Ensures no duplicate emails
      trim: true, // Removes extra spaces
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Validates email format
    },
    age: {
      type: Number,
      required: true, // Age is mandatory
      min: 21, // Minimum age constraint
    },
    adhaar: {
      type: String,
      required: true, // Aadhaar is mandatory
      unique: true, // Ensures no duplicate Aadhaar numbers
      match: /^\d{10,12}$/, // Validates Aadhaar as 10 to 12 digits
    },
    password: {
      type: String,
      required: true, // Password is mandatory
      minlength: 8, // Minimum password length
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;

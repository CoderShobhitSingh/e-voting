import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
} from "@mui/material";

const Signup = () => {
  const heading = { fontSize: "2rem", fontWeight: "600" };
  const paperStyle = {
    padding: "2rem",
    margin: "100px auto",
    borderRadius: "1rem",
    boxShadow: "10px 10px 10px",
  };
  const row = { display: "flex", marginTop: "2rem", height: "40px" };
  const btnStyle = {
    marginTop: "2rem",
    fontSize: "1.2rem",
    fontWeight: "700",
    backgroundColor: "blue",
    borderRadius: "0.5rem",
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [aadhaar, setAadhaar] = useState(""); // Updated to "aadhaar"
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    console.log({ name, email, age, aadhaar, password }); // Debug data being sent
  
    axios.post("http://localhost:3001/signup", {
        name,
        email,
        age,
        aadhaar,
        password,
      })
      .then((result) => {
        // console.log("status",result.status)
        if (result.status === 201) {
          console.log("User created successfully");
          navigate("/login");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          window.alert("Email already exists.");
        } else {
          console.log(err);
        }
      });
  };
  

  return (
    <Grid align="center">
      <Paper
        style={paperStyle}
        sx={{
          width: {
            xs: "80vw",
            sm: "50vw",
            md: "40vw",
            lg: "30vw",
            xl: "20vw",
          },
          height: "60vh",
        }}
      >
        <Typography style={heading}>User Signup</Typography>
        <form onSubmit={handleSignup}>
          <TextField
            onChange={(e) => setName(e.target.value)}
            name="name"
            required
            style={row}
            label="Enter Your Full Name"
          ></TextField>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            required
            style={row}
            label="Enter Your E-mail"
          ></TextField>
          <TextField
            onChange={(e) => setAge(e.target.value)}
            name="age"
            required
            style={row}
            label="Enter Your Age"
          ></TextField>
          <TextField
            onChange={(e) => setAadhaar(e.target.value)}
            name="aadhaar" // Consistent field name
            required
            style={row}
            label="Enter Your Aadhaar Number"
          ></TextField>
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            required
            style={row}
            label="Enter Password"
          ></TextField>

          <Button style={btnStyle} variant="contained" type="submit">
            SignUp
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Signup;

import React, { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  Link,
} from "@mui/material";
import { fontSize, fontWeight, height } from "@mui/system";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const heading = { fontSize: "2rem", fontWeight: "600" };
  const paperStyle = {
    padding: "2rem",
    margin: "100px auto",
    borderRadius: "1rem",
    boxShadow: "10px 10px 10px",
  };
  const row = { display: "flex", marginTop: "3rem", height: "40px" };
  const btnStyle = {
    marginTop: "3rem",
    fontSize: "1.2rem",
    fontWeight: "700",
    backgroundColor: "blue",
    borderRadius: "0.5rem",
  };
  const [email, setEmail] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, aadhaar, password })

      .then(result => {
        if (result.data === "Success") {
          navigate("/home");
        } 
        else {
          alert("Login Failed");
        }
      })
      .catch((err) => console.log(err));
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
        <Typography style={heading}>User Login</Typography>
        <form onSubmit={handleLogin}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            style={row}
            label="Enter Registered E-mail ID"
          ></TextField>
          <TextField
            onChange={(e) => setAadhaar(e.target.value)}
            name="aadhaar"
            style={row}
            label="Enter Your Aadhaar Number"
          ></TextField>
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            style={row}
            label="Enter Password"
          ></TextField>

          <Button style={btnStyle} variant="contained" type="submit">
            Login
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;

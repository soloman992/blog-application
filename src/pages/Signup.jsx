import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://blog-backend-t8ey.onrender.com/api/users/register",
        { username, email, password }
      );
      alert("Signup successful!");
      navigate("/blog-application/#/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 396,
        margin: "auto",
        mt: 8,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Typography
        variant="h5"
        textAlign="center"
        gutterBottom
        sx={{
          fontSize: "1.5rem",
          fontWeight: 700,
          fontFamily: "Roboto, Helvatica, Arial, sans-serif",
        }}
      >
        Sign Up
      </Typography>
      <form onSubmit={handleSignup}>
        <TextField
          fullWidth
          required
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
          sx={{
            "& .MuiInputBase-root": { height: 39 },
            "& input": {
              padding: "0 14px",
              height: "100%",
              boxSizing: "border-box",
            },
          }}
          InputLabelProps={{
            sx: {
              top: "-7px",
            },
          }}
        />
        <TextField
          fullWidth
          required
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            "& .MuiInputBase-root": { height: 39 },
            "& input": {
              padding: "0 14px",
              height: "100%",
              boxSizing: "border-box",
            },
          }}
          InputLabelProps={{
            sx: {
              top: "-7px",
            },
          }}
        />
        <TextField
          fullWidth
          required
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            "& .MuiInputBase-root": { height: 39 },
            "& input": {
              padding: "0 14px",
              height: "100%",
              boxSizing: "border-box",
            },
          }}
          InputLabelProps={{
            sx: {
              top: "-7px",
            },
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="outlined"
          sx={{
            mt: 3,
            py: 1,
            fontWeight: "normal",
            border: "1px solid #000",
            color: "#000",
            "&:hover": {
              color: "#fff",
            },
          }}
        >
          SIGNUP
        </Button>
      </form>
    </Box>
  );
}

export default Signup;

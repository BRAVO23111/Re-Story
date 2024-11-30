import React, { useState } from "react";
import NavBar from "../components/NavBar";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Divider,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { 
  Mail as MailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Google as GoogleIcon,
  Facebook as FacebookIcon 
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from 'axios'
const StyledCard = styled(Card)(({ theme }) => ({
  background: "rgba(31, 41, 55, 0.5)",
  backdropFilter: "blur(10px)",
  transition: "all 0.3s ease-in-out",
  border: "1px solid rgba(75, 85, 99, 0.3)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    color: "white",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.23)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.4)",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.7)",
  },
  "& .MuiInputAdornment-root": {
    color: "rgba(255, 255, 255, 0.7)",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  textTransform: "none",
  fontSize: "1rem",
}));

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.firstname || !formData.lastname || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields");
      return false;
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleRegister = async(e) => {
    e.preventDefault();
    const {firstname , lastname , email , password} = formData
    if(!firstname || !lastname || !email || !password) {
      alert("Please Fill all the required fields")
    }
   try {
    const response = await axios.post("http://localhost:3000/api/auth/register",{
      firstname,
      lastname,
      email,
      password,
    });
    navigate("/login")
    alert("done")
   } catch (error) {
    console.error("Registration failed:", error);
    setError(error.response?.data?.message || "Registration failed");
   }
  };

  const handlenavigation = () =>{
    navigate('/login')
  }
  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #1a1a1a, #2d3748)",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url('/src/assets/pic1.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2,
        }}
      />
      
      <NavBar />
      
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1, pt: 15, pb: 4 }}>
        <StyledCard>
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h4"
              sx={{
                color: "white",
                textAlign: "center",
                mb: 4,
                fontWeight: "bold",
              }}
            >
              Join ReStory
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleRegister}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <StyledTextField
                  fullWidth
                  label="First Name"
                  name="firstname"
                  variant="outlined"
                  margin="normal"
                  value={formData.firstname}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <StyledTextField
                  fullWidth
                  label="Last Name"
                  name="lastname"
                  variant="outlined"
                  margin="normal"
                  value={formData.lastname}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <StyledTextField
                fullWidth
                label="Email"
                name="email"
                variant="outlined"
                margin="normal"
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <StyledTextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                margin="normal"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <StyledButton
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                sx={{ mt: 3 }}
              >
                Create Account
              </StyledButton>

              

              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                  Already have an account?{" "}
                  <Button
                    sx={{
                      textTransform: "none",
                      color: "primary.main",
                      p: 0,
                      minWidth: "auto",
                    }}
                    onClick={handlenavigation}
                  >
                    Sign in
                  </Button>
                </Typography>
              </Box>
            </form>
          </CardContent>
        </StyledCard>
      </Container>
    </Box>
  );
};

export default RegisterPage;
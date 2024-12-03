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
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Google as GoogleIcon,
  Facebook as FacebookIcon 
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from 'axios';
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

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigate();
  const handleLogin = async(e) => {
    e.preventDefault();
    // Add login logic here
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login",{
        email,
        password,
      })
      console.log("Logged in");
      const token = response.data.token
      window.localStorage.setItem("token" , token);
      navigation('/buy')
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.response?.data?.message || "Login failed");
    }
  };

  const handlenavigation = ()=>{
    navigation('/register')
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
      
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1, pt: 15 }}>
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
              Welcome Back to ReStory
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleLogin}>
              <StyledTextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                type={showPassword ? "text" : "password"}
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                Sign In
              </StyledButton>

              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                  Don't have an account?{" "}
                  <Button
                    sx={{
                      textTransform: "none",
                      color: "primary.main",
                      p: 0,
                      minWidth: "auto",
                    }}
                    onClick={handlenavigation}
                  >
                    Sign up
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

export default LoginPage;
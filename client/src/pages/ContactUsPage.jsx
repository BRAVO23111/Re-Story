import React, { useState } from "react";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
} from "@mui/icons-material";

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  background: "rgba(31, 41, 55, 0.5)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(75, 85, 99, 0.3)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
  },
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
}));

const SocialIcon = styled(Box)(({ theme }) => ({
  width: 45,
  height: 45,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255, 255, 255, 0.1)",
  cursor: "pointer",
  transition: "all 0.3s ease",
  color: "white",
  "&:hover": {
    background: theme.palette.primary.main,
    transform: "translateY(-3px)",
  },
}));

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setNotification({
      show: true,
      message: "Message sent successfully!",
      severity: "success",
    });
  };

  const socialLinks = [
    { icon: <FacebookIcon />, url: "#" },
    { icon: <TwitterIcon />, url: "#" },
    { icon: <InstagramIcon />, url: "#" },
    { icon: <LinkedInIcon />, url: "#" },
  ];

  return (
    <Box 
      sx={{ 
        minHeight: "100vh", 
        position: "relative",
        background: "#1a1a1a", 
      }}
    >
      {/* Background */}
      <Box
        component={motion.div}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url('https://i.postimg.cc/qMDJVKD6/pic1.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.9))",
          },
        }}
      />

      <NavBar />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, py: 12 }}>
        {/* Header Section */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeIn}>
            <Typography variant="h2" sx={{ color: "white", textAlign: "center", mb: 3 }}>
              Contact Us
            </Typography>
          </motion.div>
          
          <motion.div variants={fadeIn}>
            <Typography 
              variant="h5" 
              sx={{ 
                color: "rgba(255, 255, 255, 0.7)", 
                textAlign: "center", 
                mb: 8,
                maxWidth: "800px",
                mx: "auto"
              }}
            >
              Have questions? We'd love to hear from you.
            </Typography>
          </motion.div>
        </motion.div>

        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <motion.div
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
            >
              <StyledCard>
                <CardContent sx={{ p: 4 }}>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <StyledTextField
                          fullWidth
                          label="Your Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <StyledTextField
                          fullWidth
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <StyledTextField
                          fullWidth
                          label="Subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <StyledTextField
                          fullWidth
                          label="Your Message"
                          name="message"
                          multiline
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{
                              height: 56,
                              background: "linear-gradient(45deg, #3b82f6, #60a5fa)",
                              "&:hover": {
                                background: "linear-gradient(45deg, #2563eb, #3b82f6)",
                              },
                            }}
                          >
                            Send Message
                          </Button>
                        </motion.div>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </StyledCard>
            </motion.div>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={5}>
            <motion.div
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.4 }}
            >
              <StyledCard>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" sx={{ color: "white", mb: 4 }}>
                    Get in Touch
                  </Typography>
                  
                  <Box sx={{ mb: 4 }}>
                    <Typography sx={{ color: "white", display: "flex", alignItems: "center", mb: 2 }}>
                      <EmailIcon sx={{ mr: 2 }} /> support@restory.com
                    </Typography>
                    <Typography sx={{ color: "white", display: "flex", alignItems: "center", mb: 2 }}>
                      <PhoneIcon sx={{ mr: 2 }} /> +1 234 567 890
                    </Typography>
                    <Typography sx={{ color: "white", display: "flex", alignItems: "center" }}>
                      <LocationIcon sx={{ mr: 2 }} /> 123 Book Street, Library City
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
                      Follow Us
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      {socialLinks.map((social, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <SocialIcon component="a" href={social.url}>
                            {social.icon}
                          </SocialIcon>
                        </motion.div>
                      ))}
                    </Box>
                  </Box>

                  <Box sx={{ mt: 4, p: 3, bgcolor: "rgba(59, 130, 246, 0.1)", borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
                      Business Hours
                    </Typography>
                    <Typography sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 1 }}>
                      Monday - Friday: 9:00 AM - 6:00 PM
                    </Typography>
                    <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                      Saturday - Sunday: Closed
                    </Typography>
                  </Box>
                </CardContent>
              </StyledCard>
            </motion.div>
          </Grid>
        </Grid>

        {/* Notification */}
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Alert
              severity={notification.severity}
              onClose={() => setNotification({ ...notification, show: false })}
              sx={{ mt: 3 }}
            >
              {notification.message}
            </Alert>
          </motion.div>
        )}
      </Container>

  
    </Box>
  );
};

export default ContactUsPage;
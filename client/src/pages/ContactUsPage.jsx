import React, { useState } from "react";
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
} from "@mui/icons-material";

const StyledCard = styled(Card)(({ theme }) => ({
  background: "rgba(31, 41, 55, 0.5)",
  backdropFilter: "blur(10px)",
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
}));

const ContactCard = styled(Card)(({ theme }) => ({
  background: "rgba(31, 41, 55, 0.5)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(75, 85, 99, 0.3)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
  height: "100%",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
  },
}));

const IconContainer = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(59, 130, 246, 0.1)",
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

const SocialIcon = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255, 255, 255, 0.1)",
  color: "white",
  transition: "all 0.3s ease-in-out",
  cursor: "pointer",
  "&:hover": {
    background: theme.palette.primary.main,
    transform: "translateY(-2px)",
  },
}));

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: "error",
        message: "Please fill in all required fields",
      });
      return;
    }
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    setStatus({
      type: "success",
      message: "Message sent successfully! We'll get back to you soon.",
    });
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: <PhoneIcon />,
      title: "Phone",
      content: "+1 (555) 123-4567",
      subContent: "Mon-Fri 9am-6pm",
    },
    {
      icon: <EmailIcon />,
      title: "Email",
      content: "support@restory.com",
      subContent: "24/7 online support",
    },
    {
      icon: <LocationIcon />,
      title: "Office",
      content: "123 Story Street",
      subContent: "Novel City, BC 12345",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #1a1a1a, #2d3748)",
      }}
    >
      <NavBar />

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          py: 12,
          textAlign: "center",
          color: "white",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ mb: 3, fontWeight: "bold" }}>
            Contact Us
          </Typography>
          <Typography
            variant="h5"
            sx={{ mb: 6, color: "rgba(255, 255, 255, 0.7)" }}
          >
            We'd love to hear from you. Let's start a conversation.
          </Typography>
        </Container>
      </Box>

      {/* Contact Info Cards */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {contactInfo.map((info) => (
            <Grid item xs={12} md={4} key={info.title}>
              <ContactCard>
                <CardContent sx={{ p: 4, textAlign: "center" }}>
                  <IconContainer>{info.icon}</IconContainer>
                  <Typography variant="h6" sx={{ mb: 1, color: "white" }}>
                    {info.title}
                  </Typography>
                  <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    {info.content}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255, 255, 255, 0.5)" }}
                  >
                    {info.subContent}
                  </Typography>
                </CardContent>
              </ContactCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contact Form Section */}
      <Container maxWidth="lg" sx={{ mb: 12 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" sx={{ mb: 4, color: "white" }}>
                  Send us a Message
                </Typography>
                {status.message && (
                  <Alert
                    severity={status.type}
                    sx={{ mb: 3 }}
                    onClose={() => setStatus({ type: "", message: "" })}
                  >
                    {status.message}
                  </Alert>
                )}
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
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{
                          height: 56,
                          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                          "&:hover": {
                            background: "linear-gradient(45deg, #1976D2 30%, #00BCD4 90%)",
                          },
                        }}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Social Media Section */}
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" sx={{ mb: 4, color: "white" }}>
                  Connect With Us
                </Typography>
                <Typography
                  sx={{ mb: 4, color: "rgba(255, 255, 255, 0.7)" }}
                >
                  Follow us on social media to stay updated with our latest news and updates.
                </Typography>
                <Grid container spacing={2}>
                  <Grid item>
                    <SocialIcon>
                      <FacebookIcon />
                    </SocialIcon>
                  </Grid>
                  <Grid item>
                    <SocialIcon>
                      <TwitterIcon />
                    </SocialIcon>
                  </Grid>
                  <Grid item>
                    <SocialIcon>
                      <InstagramIcon />
                    </SocialIcon>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{ mb: 2, color: "rgba(255, 255, 255, 0.9)" }}
                  >
                    Business Hours
                  </Typography>
                  <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    Monday - Friday: 9:00 AM - 6:00 PM
                  </Typography>
                  <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    Saturday: 10:00 AM - 4:00 PM
                  </Typography>
                  <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    Sunday: Closed
                  </Typography>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
};

export default ContactUsPage;
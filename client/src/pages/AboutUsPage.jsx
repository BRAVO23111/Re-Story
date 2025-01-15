import React from "react";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  School as SchoolIcon,
  MenuBook as MenuBookIcon,
  People as PeopleIcon,
  Favorite as FavoriteIcon,
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

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(45deg, #3b82f6, #60a5fa)",
  marginBottom: theme.spacing(2),
}));

const AboutUsPage = () => {
  const features = [
    {
      icon: <SchoolIcon sx={{ fontSize: 30, color: "white" }} />,
      title: "Educational Access",
      description: "Making education more accessible through affordable books.",
    },
    {
      icon: <MenuBookIcon sx={{ fontSize: 30, color: "white" }} />,
      title: "Book Exchange",
      description: "Creating a sustainable ecosystem for book sharing and trading.",
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 30, color: "white" }} />,
      title: "Community",
      description: "Building a vibrant community of book lovers and learners.",
    },
    {
      icon: <FavoriteIcon sx={{ fontSize: 30, color: "white" }} />,
      title: "Passion for Reading",
      description: "Fostering a love for reading and lifelong learning.",
    },
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
              About ReStory
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
              Empowering readers through accessible and sustainable book exchange
            </Typography>
          </motion.div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
        >
          <StyledCard sx={{ mb: 8 }}>
            <CardContent sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="h4" sx={{ color: "white", mb: 3 }}>
                Our Mission
              </Typography>
              <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                ReStory is dedicated to making books more accessible while promoting sustainability.
                We believe that knowledge should be shared, stories should be passed on, and books
                should find new homes where they can continue to inspire and educate.
              </Typography>
            </CardContent>
          </StyledCard>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div variants={fadeIn}>
                  <StyledCard>
                    <CardContent sx={{ p: 3, textAlign: "center" }}>
                      <IconWrapper>
                        {feature.icon}
                      </IconWrapper>
                      <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
                        {feature.title}
                      </Typography>
                      <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Team Section */}
        <Box sx={{ mt: 12 }}>
          <motion.div
            variants={fadeIn}
            initial="initial"
            animate="animate"
          >
            <Typography variant="h3" sx={{ color: "white", textAlign: "center", mb: 6 }}>
              Our Team
            </Typography>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <Grid container spacing={4} justifyContent="center">
              {/* Add team member cards here if needed */}
            </Grid>
          </motion.div>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default AboutUsPage;
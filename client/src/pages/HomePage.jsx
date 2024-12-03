import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Box,
  Grid,
  Chip,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Footer from "../components/Footer";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

// Styled components for custom effects
const StyledCard = styled(Card)(({ theme }) => ({
  background: "rgba(31, 41, 55, 0.5)",
  backdropFilter: "blur(10px)",
  transition: "all 0.3s ease-in-out",
  border: "1px solid rgba(75, 85, 99, 0.3)",
  "&:hover": {
    transform: "translateY(-5px)",
    background: "rgba(31, 41, 55, 0.6)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
  },
}));

const WelcomeBadge = styled(Chip)(({ theme }) => ({
  backgroundColor: "rgba(64, 122, 214, 0.1)",
  color: theme.palette.primary.main,
  padding: theme.spacing(1, 2),
  "& .MuiChip-label": {
    fontSize: "1rem",
  },
}));


const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  borderRadius: theme.shape.borderRadius,
  textTransform: "none",
  fontSize: "1rem",
}));

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

const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const slideIn = {
  initial: { x: -60, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check token on component mount
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleBrowseClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/buy');
      toast.success('Welcome to our book collection!');
    } else {
      navigate('/login');
      toast.error('Please login to browse books');
    }
  };

  const handleSellClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/sell');
      toast.success('List your books for sale!');
    } else {
      navigate('/login');
      toast.error('Please login to sell books');
    }
  };

  const partners = [
    {
      name: "Penguin India",
      description: "Leading publisher of literary fiction and non-fiction",
      logo: "https://i.postimg.cc/gjYzdHP8/penguinindia.png",
      years: "30+ Years of Excellence",
      books: "10,000+",
    },
    {
      name: "Harper Collins",
      description: "Publisher of award-winning literature worldwide",
      logo: "https://i.postimg.cc/0jc8NK83/harpercollins.png",
      years: "200+ Years of Publishing",
      books: "50,000+",
    },
    {
      name: "Aleph Book Company",
      description: "Independent publisher of outstanding literary works",
      logo: "https://i.postimg.cc/L689bDDM/alephpic.jpg",
      years: "10+ Years of Innovation",
      books: "5,000+",
    },
    {
      name: "Oxford University Press",
      description: "World largest university press",
      logo: "https://i.postimg.cc/3rBr1VgB/oxford.png",
      years: "500+ Years of Legacy",
      books: "100,000+",
    },
  ];

  const features = [
    {
      icon: <MenuBookIcon fontSize="large" />,
      title: "Vast Collection",
      description: "Access thousands of books across multiple genres",
    },
    {
      icon: <LocalLibraryIcon fontSize="large" />,
      title: "Quality Assured",
      description: "All books verified for quality and authenticity",
    },
    {
      icon: <BookmarkIcon fontSize="large" />,
      title: "Easy Exchange",
      description: "Seamless book buying and selling experience",
    },
  ];

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #1a1a1a, #2d3748)",
        minHeight: "100vh",
      }}
    >
      {/* Hero Section */}
      <Box
        component={motion.div}
        initial="initial"
        animate="animate"
        exit="exit"
        sx={{
          height: "100vh",
          position: "relative",
          backgroundImage: `url('https://i.postimg.cc/qMDJVKD6/pic1.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <NavBar />
        <Container
          maxWidth="lg"
          sx={{ position: "relative", zIndex: 1, pt: 15 }}
        >
          <Box sx={{ textAlign: "center", maxWidth: "800px", mx: "auto" }}>
            <motion.div variants={fadeIn}>
              <WelcomeBadge label="Welcome to ReStory" />
            </motion.div>

            <motion.div
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "3rem", md: "4.5rem" },
                  fontWeight: "bold",
                  color: "white",
                  mt: 4,
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                Affordable Books
                <Typography
                  component={motion.span}
                  variants={fadeIn}
                  transition={{ delay: 0.4 }}
                  color="primary"
                  sx={{
                    display: "block",
                    fontSize: "inherit",
                    fontWeight: "inherit",
                  }}
                >
                  Buy or Sell
                </Typography>
              </Typography>
            </motion.div>

            <motion.div
              variants={fadeIn}
              transition={{ delay: 0.6 }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  mt: 3,
                  maxWidth: "600px",
                  mx: "auto",
                }}
              >
                Join our community of book lovers and discover amazing deals on
                your favorite titles
              </Typography>
            </motion.div>

            <Box
              component={motion.div}
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              sx={{ mt: 6, display: "flex", gap: 2, justifyContent: "center" }}
            >
              <motion.div variants={slideIn}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleBrowseClick}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    px: 4,
                    py: 2,
                    fontSize: "1.1rem",
                    background: "linear-gradient(45deg, #3b82f6, #60a5fa)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #2563eb, #3b82f6)",
                    },
                    width: { xs: "100%", sm: "auto" },
                  }}
                >
                  {isLoggedIn ? 'Browse Books' : 'Start Browsing'}
                </Button>
              </motion.div>
              <motion.div variants={slideIn}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleSellClick}
                  endIcon={<MenuBookIcon />}
                  sx={{
                    px: 4,
                    py: 2,
                    fontSize: "1.1rem",
                    color: "white",
                    borderColor: "white",
                    "&:hover": {
                      borderColor: "#3b82f6",
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                    },
                    width: { xs: "100%", sm: "auto" },
                  }}
                >
                  {isLoggedIn ? 'List Your Books' : 'Start Selling'}
                </Button>
              </motion.div>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div variants={scaleIn}>
                  <StyledCard>
                    <CardContent sx={{ textAlign: "center", p: 4 }}>
                      <Box
                        sx={{
                          bgcolor: "primary.main",
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mx: "auto",
                          mb: 3,
                          color: "white",
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography variant="h5" sx={{ color: "white", mb: 2 }}>
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "rgba(255,255,255,0.7)" }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Partners Section */}
      <Box sx={{ bgcolor: "rgba(0,0,0,0.3)", py: 10 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h3"
              align="center"
              sx={{ color: "white", mb: 2 }}
            >
              Trusted by Leading Publishers
            </Typography>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Grid container spacing={4}>
              {partners.map((partner, index) => (
                <Grid item xs={12} sm={6} md={3} key={partner.name}>
                  <motion.div
                    variants={scaleIn}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <StyledCard>
                      <CardContent sx={{ textAlign: "center", p: 4 }}>
                        <Box
                          sx={{
                            height: 100,
                            mb: 3,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Box
                            component="img"
                            src={partner.logo}
                            alt={`${partner.name} logo`}
                            sx={{
                              maxWidth: "80%",
                              maxHeight: "100%",
                              objectFit: "contain",
                              display: "block",
                            }}
                          />
                        </Box>
                        <Typography variant="h6" sx={{ color: "white", mb: 1 }}>
                          {partner.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "rgba(255,255,255,0.7)", mb: 2 }}
                        >
                          {partner.description}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            justifyContent: "center",
                            flexWrap: "wrap",
                          }}
                        >
                          <Chip
                            label={partner.years}
                            size="small"
                            sx={{
                              bgcolor: "rgba(255,255,255,0.1)",
                              color: "white",
                            }}
                          />
                          <Chip
                            label={`${partner.books} Books`}
                            size="small"
                            variant="outlined"
                            sx={{
                              color: "white",
                              borderColor: "rgba(255,255,255,0.3)",
                            }}
                          />
                        </Box>
                      </CardContent>
                    </StyledCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Discover Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ color: "white", mb: 3 }}>
              Discover a World of Books Waiting for You
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "rgba(255,255,255,0.7)", mb: 4 }}
            >
              Explore our vast collection of books from around the globe. Find
              your next favorite read at unbeatable prices.
            </Typography>
            <StyledButton variant="contained" endIcon={<SearchIcon />}>
              Browse Collection
            </StyledButton>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ position: "relative" }}>
              <Box
                component="img"
                src="https://i.postimg.cc/PxbXBF0d/pic2.jpg"
                alt="Books Collection"
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
                  borderRadius: 2,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;

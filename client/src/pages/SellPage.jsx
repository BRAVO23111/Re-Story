import React, { useState } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { 
  TextField, 
  Container,
  Paper,
  Typography,
  Grid,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Button,
  Box,
  MenuItem,
} from '@mui/material';
import { BiBook, BiUser, BiCalendar, BiCategory, BiDollar, BiImage } from 'react-icons/bi';
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
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
  "& .MuiSelect-icon": {
    color: "rgba(255, 255, 255, 0.7)",
  },
  "& .MuiMenuItem-root": {
    color: "black",
  }
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

const SellPage = () => {
  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    publicationYear: "",
    genre: "",
    price: "",
    imageURL: "",
  });

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const bookGenres = [
    "Fiction",
    "Non-Fiction",
    "Science Fiction",
    "Biography",
    "History",
    "Romance",
    "Mystery",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requiredFields = [
        "title",
        "author",
        "publicationYear",
        "genre",
        "price",
      ];
      const missingFields = requiredFields.filter(
        (field) => !bookDetails[field]
      );

      if (missingFields.length > 0) {
        setNotification({
          open: true,
          message: `Please fill in all required fields: ${missingFields.join(
            ", "
          )}`,
          severity: "error",
        });
        return;
      }

      await axios.post("http://localhost:3000/api/books/sell", {
        ...bookDetails,
        price: parseFloat(bookDetails.price),
        publicationYear: parseInt(bookDetails.publicationYear),
      });

      setBookDetails({
        title: "",
        author: "",
        publicationYear: "",
        genre: "",
        price: "",
        imageURL: "",
      });

      setNotification({
        open: true,
        message: "Book successfully listed for sale!",
        severity: "success",
      });
    } catch (error) {
      setNotification({
        open: true,
        message:
          error.response?.data?.message || "Failed to list book for sale",
        severity: "error",
      });
    }
  };

  const handleCloseNotification = (_, reason) => {
    if (reason === "clickaway") return;
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box 
      sx={{ 
        minHeight: "100vh", 
        position: "relative",
        background: "#1a1a1a",
      }}
    >
      {/* Background with fade */}
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
        {/* Header with stagger effect */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeIn}>
              <Typography variant="h2" sx={{ color: "white", fontWeight: "bold", mb: 3 }}>
                Sell Your Books
              </Typography>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <Typography variant="h5" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                List your books and reach thousands of potential buyers
              </Typography>
            </motion.div>
          </motion.div>
        </Box>

        {/* Form Section */}
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={8}>
            <motion.div
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.4 }}
            >
              <StyledCard>
                <CardContent sx={{ p: 4 }}>
                  <form onSubmit={handleSubmit}>
                    <motion.div
                      variants={staggerContainer}
                      initial="initial"
                      animate="animate"
                    >
                      <Grid container spacing={3}>
                        {/* Book Title */}
                        <Grid item xs={12}>
                          <motion.div variants={fadeIn}>
                            <StyledTextField
                              fullWidth
                              label="Book Title"
                              name="title"
                              value={bookDetails.title}
                              onChange={handleInputChange}
                              required
                            />
                          </motion.div>
                        </Grid>

                        {/* Author */}
                        <Grid item xs={12}>
                          <motion.div variants={fadeIn}>
                            <StyledTextField
                              fullWidth
                              label="Author"
                              name="author"
                              value={bookDetails.author}
                              onChange={handleInputChange}
                              required
                            />
                          </motion.div>
                        </Grid>

                        {/* Publication Year and Genre */}
                        <Grid item xs={12} sm={6}>
                          <motion.div variants={fadeIn}>
                            <StyledTextField
                              fullWidth
                              label="Publication Year"
                              name="publicationYear"
                              type="number"
                              value={bookDetails.publicationYear}
                              onChange={handleInputChange}
                              required
                              inputProps={{ min: 1800, max: new Date().getFullYear() }}
                            />
                          </motion.div>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <motion.div variants={fadeIn}>
                            <StyledTextField
                              fullWidth
                              label="Genre"
                              name="genre"
                              select
                              value={bookDetails.genre}
                              onChange={handleInputChange}
                              required
                              SelectProps={{
                                MenuProps: {
                                  PaperProps: {
                                    sx: {
                                      bgcolor: 'white',
                                      '& .MuiMenuItem-root': {
                                        color: 'black',
                                      },
                                    },
                                  },
                                },
                              }}
                            >
                              {bookGenres.map((genre) => (
                                <MenuItem key={genre} value={genre}>
                                  {genre}
                                </MenuItem>
                              ))}
                            </StyledTextField>
                          </motion.div>
                        </Grid>

                        {/* Price and Image URL */}
                        <Grid item xs={12} sm={6}>
                          <motion.div variants={fadeIn}>
                            <StyledTextField
                              fullWidth
                              label="Price ($)"
                              name="price"
                              type="number"
                              value={bookDetails.price}
                              onChange={handleInputChange}
                              required
                              inputProps={{ min: 0, step: "0.01" }}
                            />
                          </motion.div>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <motion.div variants={fadeIn}>
                            <StyledTextField
                              fullWidth
                              label="Image URL"
                              name="imageURL"
                              value={bookDetails.imageURL}
                              onChange={handleInputChange}
                              placeholder="https://example.com/book-image.jpg"
                            />
                          </motion.div>
                        </Grid>

                        {/* Description */}
                        <Grid item xs={12}>
                          <motion.div variants={fadeIn}>
                            <StyledTextField
                              fullWidth
                              label="Description"
                              name="description"
                              multiline
                              rows={4}
                              value={bookDetails.description}
                              onChange={handleInputChange}
                              placeholder="Add a detailed description of your book..."
                            />
                          </motion.div>
                        </Grid>

                        {/* Condition */}
                        <Grid item xs={12}>
                          <motion.div variants={fadeIn}>
                            <StyledTextField
                              fullWidth
                              label="Book Condition"
                              name="condition"
                              select
                              value={bookDetails.condition || 'Good'}
                              onChange={handleInputChange}
                              required
                              SelectProps={{
                                MenuProps: {
                                  PaperProps: {
                                    sx: {
                                      bgcolor: 'white',
                                      '& .MuiMenuItem-root': {
                                        color: 'black',
                                      },
                                    },
                                  },
                                },
                              }}
                            >
                              {['New', 'Like New', 'Very Good', 'Good', 'Fair'].map((condition) => (
                                <MenuItem key={condition} value={condition}>
                                  {condition}
                                </MenuItem>
                              ))}
                            </StyledTextField>
                          </motion.div>
                        </Grid>

                        {/* Submit Button */}
                        <Grid item xs={12}>
                          <motion.div
                            variants={fadeIn}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
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
                              List Book for Sale
                            </Button>
                          </motion.div>
                        </Grid>
                      </Grid>
                    </motion.div>
                  </form>
                </CardContent>
              </StyledCard>
            </motion.div>
          </Grid>
        </Grid>

        {/* Notification */}
        {notification.message && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert
              severity={notification.severity}
              onClose={() => setNotification({ severity: "", message: "" })}
              sx={{ mt: 3 }}
            >
              {notification.message}
            </Alert>
          </motion.div>
        )}
      </Container>

      <Footer />
    </Box>
  );
};

export default SellPage;
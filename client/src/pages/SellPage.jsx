import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import api from '../config/config';

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

const SellPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publicationYear: "",
    genre: "",
    price: "",
    imageURL: "",
    description: "",
    condition: "Good", // Default condition
  });

  const [imageError, setImageError] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateImageUrl = async (url) => {
    try {
      const img = new Image();
      img.src = url;
      return new Promise((resolve) => {
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
      });
    } catch {
      return false;
    }
  };

  const handleImageUrlChange = async (e) => {
    const url = e.target.value;
    setFormData({ ...formData, imageURL: url });
    
    if (url) {
      const isValid = await validateImageUrl(url);
      setImageError(!isValid);
      setImagePreview(isValid ? url : null);
    } else {
      setImageError(false);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Format the data before sending
      const formattedData = {
        ...formData,
        publicationYear: parseInt(formData.publicationYear),
        price: parseFloat(formData.price),
        condition: formData.condition || "Good",
        description: formData.description || `${formData.title} by ${formData.author}`
      };

      // If image URL is provided but invalid, show error
      if (formData.imageURL && imageError) {
        toast.error('Please provide a valid image URL');
        return;
      }

      // Set default image URL if none provided
      if (!formData.imageURL) {
        formattedData.imageURL = "https://via.placeholder.com/200x300?text=Book+Cover";
      }

      // Validate required fields
      if (!formattedData.title || !formattedData.author || !formattedData.publicationYear || 
          !formattedData.genre || !formattedData.price) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Validate numeric fields
      if (isNaN(formattedData.price) || formattedData.price <= 0) {
        toast.error('Please enter a valid price');
        return;
      }

      if (isNaN(formattedData.publicationYear) || 
          formattedData.publicationYear < 1800 || 
          formattedData.publicationYear > new Date().getFullYear()) {
        toast.error('Please enter a valid publication year');
        return;
      }

      const response = await api.post('/api/books/sell', formattedData);
      
      if (response.data) {
        toast.success('Book listed for sale successfully!');
        // Reset form
        setFormData({
          title: "",
          author: "",
          publicationYear: "",
          genre: "",
          price: "",
          imageURL: "",
          description: "",
          condition: "Good",
        });
        setImagePreview(null);
        
        // Redirect to browse page after a short delay
        setTimeout(() => {
          navigate('/buy');
        }, 1000); // 1 second delay to show the success message
      }
    } catch (error) {
      console.error('Error listing book:', error);
      toast.error(error.response?.data?.message || 'Failed to list book for sale');
    }
  };

  // Add genres array
  const genres = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Science Fiction",
    "Fantasy",
    "Romance",
    "Thriller",
    "Horror",
    "Historical Fiction",
    "Biography",
    "Autobiography",
    "Self-Help",
    "Business",
    "Technology",
    "Science",
    "Poetry",
    "Drama",
    "Children's",
    "Young Adult",
    "Educational",
    "Academic",
    "Art & Photography",
    "Cooking",
    "Travel",
    "Religion & Spirituality",
    "Philosophy"
  ];

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
                              value={formData.title}
                              onChange={handleChange}
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
                              value={formData.author}
                              onChange={handleChange}
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
                              value={formData.publicationYear}
                              onChange={handleChange}
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
                              value={formData.genre}
                              onChange={handleChange}
                              required
                              SelectProps={{
                                MenuProps: {
                                  PaperProps: {
                                    sx: {
                                      bgcolor: 'white',
                                      maxHeight: '400px',
                                      '& .MuiMenuItem-root': {
                                        color: 'black',
                                      },
                                    },
                                  },
                                },
                              }}
                            >
                              {genres.map((genre) => (
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
                              value={formData.price}
                              onChange={handleChange}
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
                              value={formData.imageURL}
                              onChange={handleImageUrlChange}
                              placeholder="https://example.com/book-image.jpg"
                            />
                          </motion.div>
                        </Grid>

                        {formData.imageURL && (
                          <Grid item xs={12}>
                            <motion.div variants={fadeIn}>
                              <Box
                                sx={{
                                  mt: 2,
                                  p: 2,
                                  border: '1px solid rgba(255, 255, 255, 0.23)',
                                  borderRadius: 1,
                                  textAlign: 'center',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  minHeight: '300px'
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: imageError ? 'error.main' : 'success.main',
                                    mb: 2
                                  }}
                                >
                                  {imageError ? 'Invalid image URL' : 'Image Preview'}
                                </Typography>
                                {imagePreview && (
                                  <Box
                                    sx={{
                                      width: '100%',
                                      height: '300px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      overflow: 'hidden'
                                    }}
                                  >
                                    <img
                                      src={imagePreview}
                                      alt="Book preview"
                                      style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'contain',
                                        borderRadius: '4px'
                                      }}
                                    />
                                  </Box>
                                )}
                              </Box>
                            </motion.div>
                          </Grid>
                        )}

                        {/* Description */}
                        <Grid item xs={12}>
                          <motion.div variants={fadeIn}>
                            <StyledTextField
                              fullWidth
                              label="Description"
                              name="description"
                              multiline
                              rows={4}
                              value={formData.description}
                              onChange={handleChange}
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
                              value={formData.condition}
                              onChange={handleChange}
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
                              {['new', 'like new', 'Good', 'acceptable', 'damaged'].map((condition) => (
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
      </Container>

    </Box>
  );
};

export default SellPage;
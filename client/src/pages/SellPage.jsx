import { motion } from "framer-motion";
import React, { useState } from "react";
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/books/sell', formData);
      toast.success('Book listed for sale successfully!'); // Success toast
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
    } catch (error) {
      console.error('Error listing book:', error);
      toast.error('Failed to list book for sale'); // Error toast
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
                              onChange={handleChange}
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
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  TextField,
  Slider,
  Chip,
  Button,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import api from '../config/config';
import { toast } from "react-hot-toast";
import ProductPage from "./ProductPage";

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

const StyledCard = styled(Card)(({ theme }) => ({
  background: "rgba(31, 41, 55, 0.5)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(75, 85, 99, 0.3)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const BuyPage = () => {
  // States
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("newest");
  const [yearRange, setYearRange] = useState([1900, new Date().getFullYear()]);

  const navigate = useNavigate();

  const genres = ["All", "Fiction", "Non-Fiction", "Mystery", "Science Fiction", "Romance", "Biography"];

  // Fetch books from the server
  const fetchBooks = async () => {
    try {
      const response = await api.get('/api/books/sale');
      setBooks(response.data);
      setFilteredBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      toast.error('Failed to fetch books');
    }
  };

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Filter and sort handlers
  useEffect(() => {
    let result = [...books];
    
    // Search filter
    if (searchTerm) {
      result = result.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Genre filter
    if (selectedGenre !== "All") {
      result = result.filter(book => book.genre === selectedGenre);
    }
    
    // Price range filter
    result = result.filter(book => 
      book.price >= priceRange[0] && book.price <= priceRange[1]
    );

    // Year filter
    result = result.filter(book => 
      book.publicationYear >= yearRange[0] && book.publicationYear <= yearRange[1]
    );

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "newest":
          return b.publicationYear - a.publicationYear;
        case "oldest":
          return a.publicationYear - b.publicationYear;
        default:
          return 0;
      }
    });

    setFilteredBooks(result);
  }, [books, searchTerm, selectedGenre, priceRange, sortBy, yearRange]);

  return (
    <Box 
      sx={{ 
        minHeight: "100vh", 
        position: "relative",
        background: "#1a1a1a", 
      }}
    >
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

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, py: 12 }}>
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeIn}>
            <Typography variant="h2" sx={{ color: "white", textAlign: "center", mb: 3 }}>
              Browse Books
            </Typography>
          </motion.div>
          
          <motion.div variants={fadeIn}>
            <Typography variant="h5" sx={{ color: "rgba(255, 255, 255, 0.7)", textAlign: "center", mb: 6 }}>
              Find your next favorite book
            </Typography>
          </motion.div>
        </motion.div>

        {/* Filters Section */}
        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
        >
          <StyledCard sx={{ mb: 4, p: 3 }}>
            <Grid container spacing={3}>
              {/* Search */}
              <Grid item xs={12} md={6}>
                <StyledTextField
                  fullWidth
                  label="Search books..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Grid>

              {/* Sort */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    sx={{ color: "white", borderColor: "rgba(255, 255, 255, 0.23)" }}
                  >
                    <MenuItem value="newest">Newest First</MenuItem>
                    <MenuItem value="oldest">Oldest First</MenuItem>
                    <MenuItem value="price-low">Price: Low to High</MenuItem>
                    <MenuItem value="price-high">Price: High to Low</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Genre Chips */}
              <Grid item xs={12}>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {genres.map((genre) => (
                    <Chip
                      key={genre}
                      label={genre}
                      onClick={() => setSelectedGenre(genre)}
                      sx={{
                        bgcolor: selectedGenre === genre ? "primary.main" : "rgba(255, 255, 255, 0.1)",
                        color: "white",
                        '&:hover': {
                          bgcolor: selectedGenre === genre ? "primary.dark" : "rgba(255, 255, 255, 0.2)",
                        }
                      }}
                    />
                  ))}
                </Box>
              </Grid>

              {/* Price Range */}
              <Grid item xs={12} md={6}>
                <Typography sx={{ color: "white", mb: 2 }}>Price Range: ${priceRange[0]} - ${priceRange[1]}</Typography>
                <Slider
                  value={priceRange}
                  onChange={(e, newValue) => setPriceRange(newValue)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={1000}
                  sx={{ color: "primary.main" }}
                />
              </Grid>

              {/* Year Range */}
              <Grid item xs={12} md={6}>
                <Typography sx={{ color: "white", mb: 2 }}>Year: {yearRange[0]} - {yearRange[1]}</Typography>
                <Slider
                  value={yearRange}
                  onChange={(e, newValue) => setYearRange(newValue)}
                  valueLabelDisplay="auto"
                  min={1900}
                  max={new Date().getFullYear()}
                  sx={{ color: "primary.main" }}
                />
              </Grid>
            </Grid>
          </StyledCard>
        </motion.div>

        {/* Books Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <Grid container spacing={3}>
            {filteredBooks.map((book) => (
              <Grid item xs={12} sm={6} md={4} key={book._id}>
                <motion.div variants={fadeIn}>
                  <StyledCard>
                    <Box sx={{ position: "relative", paddingTop: "80%" }}>
                      <img
                        src={book.imageURL || 'https://via.placeholder.com/300x400?text=No+Image'}
                        alt={book.title}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
                        }}
                      />
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <Typography variant="h6" sx={{ color: "white", mb: 1 }}>
                        {book.title}
                      </Typography>
                      <Typography sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 1 }}>
                        by {book.author}
                      </Typography>
                      <Typography sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 1 }}>
                        Genre: {book.genre}
                      </Typography>
                      <Typography sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 1 }}>
                        Year: {book.publicationYear}
                      </Typography>
                      <Typography sx={{ color: "white", fontWeight: "bold", mb: 1 }}>
                        ${book.price}
                      </Typography>
                      <Typography sx={{ color: "white", fontWeight: "semi-bold", mb: 2 }}>
                        Condition: {book.condition}
                      </Typography>
                      <Typography 
                        sx={{ 
                          color: "rgba(255, 255, 255, 0.7)", 
                          mb: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {book.description}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{
                            background: "linear-gradient(45deg, #3b82f6, #60a5fa)",
                            "&:hover": {
                              background: "linear-gradient(45deg, #2563eb, #3b82f6)",
                            },
                          }}
                          onClick={() => {
                            // Add your buy/contact logic here
                            toast.success(`Contacting seller for ${book.title}`);
                          }}
                        >
                          Contact Seller
                        </Button>
                        <Button
                          fullWidth
                          variant="outlined"
                          sx={{
                            color: "white",
                            borderColor: "white",
                            "&:hover": {
                              borderColor: "#3b82f6",
                              backgroundColor: "rgba(59, 130, 246, 0.1)",
                            },
                          }}
                          onClick={() => {
                            // Navigate to product details page
                            navigate(`/product/${book._id}`);                        }}
                        >
                          Details
                        </Button>
                      </Box>
                    </Box>
                  </StyledCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Empty State - show when no books match filters */}
        {filteredBooks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Box sx={{ textAlign: "center", mt: 8 }}>
              <Typography variant="h5" sx={{ color: "white", mb: 2 }}>
                No books found matching your criteria
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedGenre("All");
                  setPriceRange([0, 1000]);
                  setYearRange([1900, new Date().getFullYear()]);
                  setSortBy("newest");
                }}
                sx={{ 
                  color: "white", 
                  borderColor: "white",
                  "&:hover": {
                    borderColor: "#3b82f6",
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                  },
                }}
              >
                Reset Filters
              </Button>
            </Box>
          </motion.div>
        )}

        {/* Loading State */}
        {books.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Box sx={{ textAlign: "center", mt: 8 }}>
              <Typography variant="h5" sx={{ color: "white", mb: 2 }}>
                Loading books...
              </Typography>
            </Box>
          </motion.div>
        )}
      </Container>
    </Box>
  );
};

export default BuyPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Chip,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Search as SearchIcon,
  MenuBook as MenuBookIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  LocalOffer as PriceIcon,
} from "@mui/icons-material";

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  background: "rgba(31, 41, 55, 0.5)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(75, 85, 99, 0.3)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
  transition: "all 0.3s ease-in-out",
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

const BuyPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/books/sale");
        setBooks(response.data);
        setFilteredBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  // Filter books based on search term and genre
  useEffect(() => {
    let result = books;
    
    if (searchTerm) {
      result = result.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedGenre !== "All") {
      result = result.filter(book => book.genre === selectedGenre);
    }
    
    setFilteredBooks(result);
  }, [searchTerm, selectedGenre, books]);

  // Get unique genres from books
  const genres = ["All", ...new Set(books.map(book => book.genre))];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #1a1a1a, #2d3748)",
        position: "relative",
      }}
    >
      {/* Background Image with Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('https://i.postimg.cc/PxbXBF0d/pic2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, py: 12 }}>
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h2" sx={{ color: "white", fontWeight: "bold", mb: 3 }}>
            Available Books
          </Typography>
          <Typography variant="h5" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
            Discover your next favorite read from our collection
          </Typography>
        </Box>

        {/* Search and Filter Section */}
        <Box sx={{ mb: 6 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {genres.map((genre) => (
                  <Chip
                    key={genre}
                    label={genre}
                    onClick={() => setSelectedGenre(genre)}
                    sx={{
                      bgcolor: selectedGenre === genre ? "primary.main" : "rgba(255, 255, 255, 0.1)",
                      color: "white",
                      "&:hover": {
                        bgcolor: selectedGenre === genre ? "primary.dark" : "rgba(255, 255, 255, 0.2)",
                      },
                    }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Books Grid */}
        <Grid container spacing={4}>
          {filteredBooks.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book._id}>
              <StyledCard>
                <Box
                  sx={{
                    height: 300,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={book.imageURL || "https://picsum.photos/400/600"}
                    alt={book.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 2,
                      background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                    }}
                  >
                    <Typography variant="h6" sx={{ color: "white", mb: 1 }}>
                      {book.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                      by {book.author}
                    </Typography>
                  </Box>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CalendarIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
                      <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                        {book.publicationYear}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <MenuBookIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
                      <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                        {book.genre}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <PriceIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
                      <Typography sx={{ color: "white", fontWeight: "bold" }}>
                        ${book.price}
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 2,
                      background: "linear-gradient(45deg, #3b82f6, #60a5fa)",
                      "&:hover": {
                        background: "linear-gradient(45deg, #2563eb, #3b82f6)",
                      },
                    }}
                  >
                    Buy Now
                  </Button>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <Box sx={{ textAlign: "center", mt: 8 }}>
            <Typography variant="h5" sx={{ color: "white", mb: 2 }}>
              No books found
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
              Try adjusting your search or filters
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default BuyPage;

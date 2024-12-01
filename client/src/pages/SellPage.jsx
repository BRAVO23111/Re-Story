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
  Box
} from '@mui/material';
import { BiBook, BiUser, BiCalendar, BiCategory, BiDollar, BiImage } from 'react-icons/bi';
import { styled } from "@mui/material/styles";

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
        {/* Hero Section */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h2" sx={{ color: "white", fontWeight: "bold", mb: 3 }}>
            Sell Your Books
          </Typography>
          <Typography variant="h5" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
            Give your books a second life in our community
          </Typography>
        </Box>

        {/* Form Section */}
        <StyledCard sx={{ maxWidth: "800px", mx: "auto" }}>
          <CardContent sx={{ p: 6 }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    name="title"
                    label="Book Title"
                    value={bookDetails.title}
                    onChange={handleInputChange}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    name="author"
                    label="Author"
                    value={bookDetails.author}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    type="number"
                    name="publicationYear"
                    label="Publication Year"
                    value={bookDetails.publicationYear}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <select
                    name="genre"
                    value={bookDetails.genre}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 rounded-lg bg-transparent border border-gray-500 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="" disabled className="bg-gray-800">Select Genre</option>
                    {bookGenres.map((genre) => (
                      <option key={genre} value={genre} className="bg-gray-800">
                        {genre}
                      </option>
                    ))}
                  </select>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    type="number"
                    name="price"
                    label="Price ($)"
                    value={bookDetails.price}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    name="imageURL"
                    label="Image URL (Optional)"
                    value={bookDetails.imageURL}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    startIcon={<FaCloudUploadAlt />}
                    sx={{
                      py: 1.5,
                      mt: 2,
                      bgcolor: "primary.main",
                      "&:hover": {
                        bgcolor: "primary.dark",
                      },
                    }}
                  >
                    List Book for Sale
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </StyledCard>
      </Container>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SellPage;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import { Box, Container, Grid, Typography, Paper, Chip, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import api from '../config/config';
import { toast } from 'react-hot-toast';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: "rgba(31, 41, 55, 0.5)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(75, 85, 99, 0.3)",
  transition: "transform 0.3s ease",
  padding: theme.spacing(3),
  margin: theme.spacing(2, 0),
  boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #3b82f6 30%, #60a5fa 90%)',
  borderRadius: '8px',
  border: 0,
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(59, 130, 246, .3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #2563eb 30%, #3b82f6 90%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 10px 2px rgba(59, 130, 246, .3)',
  },
}));

const ProductPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await api.get(`/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
        toast.error('Failed to load book details');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return (
      <Box 
        sx={{ 
          minHeight: "100vh",
          background: "#1a1a1a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Typography variant="h5" sx={{ color: "white" }}>Loading...</Typography>
      </Box>
    );
  }

  if (!book) {
    return (
      <Box 
        sx={{ 
          minHeight: "100vh",
          background: "#1a1a1a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Typography variant="h5" sx={{ color: "white" }}>Book not found</Typography>
      </Box>
    );
  }

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

      <Container 
        maxWidth="lg" 
        sx={{ 
          position: "relative", 
          zIndex: 1, 
          py: 8 
        }}
      >
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <motion.div variants={fadeIn}>
                <img
                  src={book.imageURL || '/default-book-cover.jpg'}
                  alt={book.title}
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div variants={fadeIn}>
                <StyledPaper>
                  <Typography variant="h3" sx={{ color: "white", mb: 2 }}>
                    {book.title}
                  </Typography>
                  <Typography variant="h5" sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 3 }}>
                    by {book.author}
                  </Typography>
                  <Box display="flex" gap={1} mb={3}>
                    {book.genre && <Chip label={book.genre} color="primary" />}
                    {book.condition && <Chip label={book.condition} color="secondary" />}
                    {book.transactionType && (
                      <Chip 
                        label={book.transactionType.toUpperCase()} 
                        variant="outlined" 
                        sx={{ borderColor: 'white', color: 'white' }}
                      />
                    )}
                  </Box>
                  <Typography variant="h4" sx={{ color: "#3b82f6", mb: 3 }}>
                    ${book.price}
                  </Typography>
                  {!book.sold && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <StyledButton
                        fullWidth
                        startIcon={<ShoppingCartIcon />}
                        onClick={() => {
                          // Open email client with seller's details
                          if (book.sellerDetails) {
                            window.location.href = `mailto:${book.sellerDetails}?subject=Interested in buying: ${book.title}&body=Hi, I am interested in buying the book "${book.title}" listed for $${book.price}.`;
                            toast.success('Opening email client...');
                          } else {
                            toast.error('Seller contact details not available');
                          }
                        }}
                        sx={{ mb: 3 }}
                      >
                        Buy Now
                      </StyledButton>
                    </motion.div>
                  )}
                  {book.description && (
                    <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.9)", mb: 3 }}>
                      <strong>Description:</strong><br />
                      {book.description}
                    </Typography>
                  )}
                  <Box mt={3}>
                    {book.publicationYear && (
                      <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 1 }}>
                        <strong>Publication Year:</strong> {book.publicationYear}
                      </Typography>
                    )}
                    {book.condition && (
                      <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 1 }}>
                        <strong>Condition:</strong> {book.condition}
                      </Typography>
                    )}
                    {book.sellerDetails && (
                      <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 1 }}>
                        <strong>Seller Details:</strong> {book.sellerDetails}
                      </Typography>
                    )}
                    {book.sold && (
                      <Chip 
                        label="SOLD" 
                        color="error" 
                        sx={{ mt: 2 }}
                      />
                    )}
                  </Box>
                </StyledPaper>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ProductPage;

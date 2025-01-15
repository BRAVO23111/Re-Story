import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Container, Grid, Typography, Paper, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2, 0),
  boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
}));

const ProductPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <Box textAlign="center" py={4}>Loading...</Box>;
  }

  if (!book) {
    return <Box textAlign="center" py={4}>Book not found</Box>;
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} py={4}>
        <Grid item xs={12} md={6}>
          <img
            src={book.imageURL || '/default-book-cover.jpg'}
            alt={book.title}
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h4" gutterBottom>
              {book.title}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              by {book.author}
            </Typography>
            <Box display="flex" gap={1} mb={2}>
              <Chip label={book.genre} color="primary" />
              <Chip label={book.condition} color="secondary" />
              <Chip label={book.transactionType.toUpperCase()} variant="outlined" />
            </Box>
            <Typography variant="h5" color="primary" gutterBottom>
              ${book.price}
            </Typography>
            <Box mt={2}>
              <Typography variant="body1" gutterBottom>
                <strong>Publication Year:</strong> {book.publicationYear}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Condition:</strong> {book.condition}
              </Typography>
              {book.sellerDetails && (
                <Typography variant="body1" gutterBottom>
                  <strong>Seller Details:</strong> {book.sellerDetails}
                </Typography>
              )}
              {book.sold && (
                <Chip 
                  label="SOLD" 
                  color="error" 
                  style={{ marginTop: '16px' }}
                />
              )}
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPage;

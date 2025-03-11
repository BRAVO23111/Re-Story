// React import is required for JSX
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, Container, Typography, Paper, Button, IconButton, Grid, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { removeCart, increaseQuantity, decreaseQuantity } from '../store/slices/cartSlice';
import { toast } from 'react-hot-toast';
import api from '../config/config';
import { loadStripe } from '@stripe/stripe-js';

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const StyledPaper = styled(Paper)(() => ({
  background: "rgba(31, 41, 55, 0.5)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(75, 85, 99, 0.3)",
  transition: "transform 0.3s ease",
  padding: '24px',
  margin: '16px 0',
  boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
}));

const StyledButton = styled(Button)(() => ({
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

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector(state => state.cart);

  const handleRemoveItem = (id) => {
    dispatch(removeCart(id));
    toast.success('Item removed from cart');
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(increaseQuantity({ id: item.id }));
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(decreaseQuantity({ id: item.id }));
    } else {
      dispatch(removeCart(item.id));
      toast.success('Item removed from cart');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    try {
      const stripe = await stripePromise;
      if (!stripe) {
        toast.error('Stripe failed to load');
        return;
      }

      // Create a payment intent for all items in cart
      const response = await api.post('/api/payments/create-payment-intent', {
        amount: calculateTotal(),
        currency: 'inr',
        items: cartItems.map(item => ({
          id: item.id,
          quantity: item.quantity
        }))
      });

      if (!response.data.success) {
        throw new Error('Failed to create payment');
      }

      // Redirect to Stripe checkout
      const result = await stripe.redirectToCheckout({
        sessionId: response.data.sessionId
      });

      if (result.error) {
        toast.error(result.error.message);
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Payment failed');
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: "100vh",
        position: "relative",
        background: "#1a1a1a",
        py: 8
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
          zIndex: 1
        }}
      >
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <Typography variant="h3" sx={{ color: "white", mb: 4, textAlign: "center" }}>
            Your Shopping Cart
          </Typography>

          {cartItems.length === 0 ? (
            <motion.div variants={fadeIn}>
              <StyledPaper>
                <Typography variant="h5" sx={{ color: "white", textAlign: "center", py: 4 }}>
                  Your cart is empty
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  onClick={() => navigate('/buy')}
                >
                  Continue Shopping
                </Button>
              </StyledPaper>
            </motion.div>
          ) : (
            <>
              {cartItems.map((item) => (
                <motion.div key={item.id} variants={fadeIn}>
                  <StyledPaper>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={3} md={2}>
                        <img 
                          src={item.imageURL || '/default-book-cover.jpg'} 
                          alt={item.title}
                          style={{ 
                            width: '100%', 
                            height: 'auto', 
                            borderRadius: '8px',
                            maxHeight: '120px',
                            objectFit: 'cover'
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={5} md={6}>
                        <Typography variant="h6" sx={{ color: "white" }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                          by {item.author}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={2} md={2}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <IconButton 
                            size="small" 
                            onClick={() => handleDecreaseQuantity(item)}
                            sx={{ color: 'white', bgcolor: 'rgba(255, 255, 255, 0.1)' }}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography variant="body1" sx={{ color: "white", mx: 1 }}>
                            {item.quantity}
                          </Typography>
                          <IconButton 
                            size="small" 
                            onClick={() => handleIncreaseQuantity(item)}
                            sx={{ color: 'white', bgcolor: 'rgba(255, 255, 255, 0.1)' }}
                          >
                            <AddIcon />
                          </IconButton>
                        </Stack>
                      </Grid>
                      <Grid item xs={4} sm={1} md={1} sx={{ textAlign: 'right' }}>
                        <Typography variant="h6" sx={{ color: "#3b82f6" }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Grid>
                      <Grid item xs={2} sm={1} md={1} sx={{ textAlign: 'right' }}>
                        <IconButton 
                          onClick={() => handleRemoveItem(item.id)}
                          sx={{ color: '#ef4444' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </StyledPaper>
                </motion.div>
              ))}

              <motion.div variants={fadeIn}>
                <StyledPaper sx={{ mt: 4 }}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h5" sx={{ color: "white", textAlign: 'right' }}>
                      Total: <span style={{ color: '#3b82f6' }}>${calculateTotal()}</span>
                    </Typography>
                  </Box>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Button 
                        variant="outlined" 
                        fullWidth
                        onClick={() => navigate('/buy')}
                        sx={{ 
                          color: 'white', 
                          borderColor: 'white',
                          height: 48,
                          '&:hover': {
                            borderColor: '#3b82f6',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)'
                          }
                        }}
                      >
                        Continue Shopping
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <StyledButton
                        fullWidth
                        startIcon={<ShoppingCartCheckoutIcon />}
                        onClick={handleCheckout}
                      >
                        Checkout
                      </StyledButton>
                    </Grid>
                  </Grid>
                </StyledPaper>
              </motion.div>
            </>
          )}
        </motion.div>
      </Container>
    </Box>
  );
};

export default CartPage;
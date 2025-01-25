import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SuccessPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const productId = searchParams.get('productId');

    useEffect(() => {
        // Show success message for 3 seconds, then redirect
        const timer = setTimeout(() => {
            if (productId) {
                navigate(`/product/${productId}`);
            } else {
                navigate('/'); // Fallback to home if no productId
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate, productId]);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: '#1a1a1a',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3
            }}
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: 80 }} />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <Typography variant="h4" sx={{ color: 'white', textAlign: 'center' }}>
                    Payment Successful!
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mt: 2, textAlign: 'center' }}>
                    Redirecting back to product page...
                </Typography>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <CircularProgress size={24} sx={{ color: '#3b82f6' }} />
            </motion.div>
        </Box>
    );
};

export default SuccessPage;

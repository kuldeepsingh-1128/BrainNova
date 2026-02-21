import React, { useState } from 'react';
import {
    Container, TextField, Button, Typography,
    Paper, Box, Alert, InputAdornment, IconButton
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Store } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const SellerLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { data } = await API.post('/auth/login', { email, password });
            
            // Check if user is a seller
            if (data.user.role !== 'seller') {
                setError('Invalid credentials. This login is for sellers only. Buyers please use buyer login.');
                return;
            }
            
            login(data.user, data.token);
            navigate('/seller-dashboard');
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Login failed';
            if (errorMsg.includes('not verified')) {
                setError('⏳ Your seller account is pending admin verification. Please wait for approval or contact support.');
            } else {
                setError(errorMsg);
            }
        }
    };

    return (
        <Container maxWidth="xs" sx={{ py: { xs: 8, md: 12 } }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                <Paper sx={{ p: 4, borderRadius: 4, border: '2px solid', borderColor: 'success.light' }}>
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Box sx={{ 
                            width: 80, 
                            height: 80, 
                            borderRadius: '50%', 
                            bgcolor: 'success.main', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 2
                        }}>
                            <Store sx={{ fontSize: 40, color: 'white' }} />
                        </Box>
                        <Typography variant="h4" fontWeight={800} gutterBottom>Seller Login</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Login to manage your products and orders
                        </Typography>
                    </Box>

                    {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            fullWidth label="Email Address" margin="normal"
                            value={email} onChange={(e) => setEmail(e.target.value)} required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth label="Password" type={showPassword ? 'text' : 'password'} margin="normal"
                            value={password} onChange={(e) => setPassword(e.target.value)} required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="success"
                            type="submit"
                            size="large"
                            sx={{ mt: 4, py: 1.5, fontWeight: 700 }}
                        >
                            Login as Seller
                        </Button>
                    </Box>

                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Don't have a seller account?{' '}
                            <Link to="/register/seller" style={{ fontWeight: 600, color: '#2e7d32' }}>
                                Register as Seller
                            </Link>
                        </Typography>
                        <Typography variant="body2">
                            Are you a buyer?{' '}
                            <Link to="/login/buyer" style={{ fontWeight: 600, color: '#1a237e' }}>
                                Buyer Login
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </motion.div>
        </Container>
    );
};

export default SellerLogin;

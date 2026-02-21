import React, { useState } from 'react';
import {
    Container, TextField, Button, Typography,
    Paper, Box, Alert, InputAdornment, IconButton
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, ShoppingBag } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const BuyerLogin = () => {
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
            
            // Check if user is a buyer
            if (data.user.role !== 'buyer') {
                setError('Invalid credentials. This login is for buyers only. Sellers please use seller login.');
                return;
            }
            
            login(data.user, data.token);
            navigate('/products');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <Container maxWidth="xs" sx={{ py: { xs: 8, md: 12 } }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                <Paper sx={{ p: 4, borderRadius: 4, border: '2px solid', borderColor: 'primary.light' }}>
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Box sx={{ 
                            width: 80, 
                            height: 80, 
                            borderRadius: '50%', 
                            bgcolor: 'primary.main', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 2
                        }}>
                            <ShoppingBag sx={{ fontSize: 40, color: 'white' }} />
                        </Box>
                        <Typography variant="h4" fontWeight={800} gutterBottom>Buyer Login</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Login to browse and purchase amazing products
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
                            type="submit"
                            size="large"
                            sx={{ mt: 4, py: 1.5, fontWeight: 700 }}
                        >
                            Login as Buyer
                        </Button>
                    </Box>

                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Don't have a buyer account?{' '}
                            <Link to="/register/buyer" style={{ fontWeight: 600, color: '#1a237e' }}>
                                Register as Buyer
                            </Link>
                        </Typography>
                        <Typography variant="body2">
                            Are you a seller?{' '}
                            <Link to="/login/seller" style={{ fontWeight: 600, color: '#1a237e' }}>
                                Seller Login
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </motion.div>
        </Container>
    );
};

export default BuyerLogin;

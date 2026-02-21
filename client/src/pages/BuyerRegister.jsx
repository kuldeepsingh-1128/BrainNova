import React, { useState } from 'react';
import {
    Container, TextField, Button, Typography,
    Paper, Box, Alert, Grid,
    InputAdornment
} from '@mui/material';
import {
    Person, Email, Phone, Lock, ShoppingBag
} from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { motion } from 'framer-motion';

const BuyerRegister = () => {
    const [formData, setFormData] = useState({
        name: '', 
        email: '', 
        phone: '', 
        password: '',
        role: 'buyer'
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        try {
            await API.post('/auth/register', formData);
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login/buyer'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 } }}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, border: '2px solid', borderColor: 'primary.light' }}>
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
                        <Typography variant="h4" fontWeight={800} gutterBottom>
                            Create Buyer Account
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Join ODOP to discover amazing heritage products
                        </Typography>
                    </Box>

                    {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField 
                                    fullWidth 
                                    label="Full Name" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    required 
                                    InputProps={{ 
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Person color="action" />
                                            </InputAdornment>
                                        ) 
                                    }} 
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    fullWidth 
                                    label="Email Address" 
                                    name="email" 
                                    type="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    required 
                                    InputProps={{ 
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email color="action" />
                                            </InputAdornment>
                                        ) 
                                    }} 
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    fullWidth 
                                    label="Phone Number" 
                                    name="phone" 
                                    value={formData.phone} 
                                    onChange={handleChange} 
                                    required 
                                    InputProps={{ 
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Phone color="action" />
                                            </InputAdornment>
                                        ) 
                                    }} 
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    fullWidth 
                                    label="Create Password" 
                                    name="password" 
                                    type="password" 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    required 
                                    InputProps={{ 
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock color="action" />
                                            </InputAdornment>
                                        ) 
                                    }} 
                                />
                            </Grid>
                        </Grid>

                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            size="large"
                            sx={{ mt: 4, py: 1.5, fontWeight: 700 }}
                        >
                            Register as Buyer
                        </Button>
                    </Box>

                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Already have a buyer account?{' '}
                            <Link to="/login/buyer" style={{ fontWeight: 600, color: '#1a237e' }}>
                                Login here
                            </Link>
                        </Typography>
                        <Typography variant="body2">
                            Want to sell products?{' '}
                            <Link to="/register/seller" style={{ fontWeight: 600, color: '#2e7d32' }}>
                                Register as Seller
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </motion.div>
        </Container>
    );
};

export default BuyerRegister;

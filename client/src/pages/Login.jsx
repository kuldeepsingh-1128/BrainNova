import React, { useState } from 'react';
import {
    Container, TextField, Button, Typography,
    Paper, Box, Alert, InputAdornment, IconButton
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
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
            login(data.user, data.token);
            if (data.user.role === 'admin') navigate('/admin-dashboard');
            else if (data.user.role === 'seller') navigate('/seller-dashboard');
            else navigate('/products');
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
                <Paper sx={{ p: 4, borderRadius: 4 }}>
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography variant="h4" fontWeight={800} gutterBottom>Welcome Back</Typography>
                        <Typography variant="body2" color="text.secondary">Login to access your ODOP account</Typography>
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
                            Login
                        </Button>
                    </Box>

                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Typography variant="body2">
                            Don't have an account? <Link to="/register" style={{ fontWeight: 600, color: '#1a237e' }}>Register here</Link>
                        </Typography>
                    </Box>
                </Paper>
            </motion.div>
        </Container>
    );
};

export default Login;

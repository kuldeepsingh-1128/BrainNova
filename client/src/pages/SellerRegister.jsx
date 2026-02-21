import React, { useState } from 'react';
import {
    Container, TextField, Button, Typography,
    Paper, Box, Alert, Grid, MenuItem,
    Card, Stack
} from '@mui/material';
import {
    Person, Email, Phone, Lock, Store,
    AssignmentInd, PhotoCamera, LocationOn, Category
} from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { motion } from 'framer-motion';

const SellerRegister = () => {
    const [formData, setFormData] = useState({
        name: '', 
        email: '', 
        phone: '', 
        password: '',
        role: 'seller',
        district: '', 
        productCategory: ''
    });
    const [aadhaar, setAadhaar] = useState(null);
    const [shopPhoto, setShopPhoto] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const districts = [
        'Ajmer', 'Alwar', 'Banswara', 'Baran', 'Barmer', 'Bharatpur', 
        'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dausa',
        'Jaipur', 'Jaisalmer', 'Jodhpur', 'Kota', 'Udaipur'
    ];

    const categories = [
        'Textiles', 'Handicrafts', 'Art', 'Jewelry', 'Footwear', 
        'Food', 'Perfumes', 'Furniture', 'Home Decor', 'Other'
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (aadhaar) data.append('aadhaar', aadhaar);
        if (shopPhoto) data.append('shopPhoto', shopPhoto);

        try {
            await API.post('/auth/register', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setSuccess('Registration successful! Your account is pending admin approval. We will notify you once verified.');
            setTimeout(() => navigate('/login/seller'), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, border: '2px solid', borderColor: 'success.light' }}>
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
                        <Typography variant="h4" fontWeight={800} gutterBottom>
                            Create Seller Account
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Join ODOP to showcase your heritage products to the world
                        </Typography>
                    </Box>

                    {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

                    <Box component="form" onSubmit={handleSubmit}>
                        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ mt: 2, mb: 2 }}>
                            Personal Information
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    fullWidth 
                                    label="Full Name" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    required 
                                    InputProps={{ startAdornment: <Person color="action" sx={{ mr: 1 }} /> }} 
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    fullWidth 
                                    label="Email Address" 
                                    name="email" 
                                    type="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    required 
                                    InputProps={{ startAdornment: <Email color="action" sx={{ mr: 1 }} /> }} 
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    fullWidth 
                                    label="Phone Number" 
                                    name="phone" 
                                    value={formData.phone} 
                                    onChange={handleChange} 
                                    required 
                                    InputProps={{ startAdornment: <Phone color="action" sx={{ mr: 1 }} /> }} 
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    fullWidth 
                                    label="Create Password" 
                                    name="password" 
                                    type="password" 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    required 
                                    InputProps={{ startAdornment: <Lock color="action" sx={{ mr: 1 }} /> }} 
                                />
                            </Grid>
                        </Grid>

                        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ mt: 4, mb: 2 }}>
                            Business Information
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    fullWidth 
                                    select 
                                    label="District" 
                                    name="district" 
                                    value={formData.district} 
                                    onChange={handleChange} 
                                    required
                                    InputProps={{ startAdornment: <LocationOn color="action" sx={{ mr: 1 }} /> }}
                                >
                                    {districts.map(district => (
                                        <MenuItem key={district} value={district}>{district}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    fullWidth 
                                    select 
                                    label="Product Category" 
                                    name="productCategory" 
                                    value={formData.productCategory} 
                                    onChange={handleChange} 
                                    required
                                    InputProps={{ startAdornment: <Category color="action" sx={{ mr: 1 }} /> }}
                                >
                                    {categories.map(category => (
                                        <MenuItem key={category} value={category}>{category}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>

                        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ mt: 4, mb: 2 }}>
                            Verification Documents
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Card variant="outlined" sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50' }}>
                                    <AssignmentInd sx={{ fontSize: 50, color: 'success.main', mb: 2 }} />
                                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                        Aadhaar Card
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        Upload PDF or Image
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        fullWidth
                                    >
                                        Choose File
                                        <input 
                                            type="file" 
                                            hidden 
                                            accept=".pdf,image/*"
                                            onChange={(e) => setAadhaar(e.target.files[0])} 
                                            required 
                                        />
                                    </Button>
                                    {aadhaar && (
                                        <Typography variant="caption" color="success.main" sx={{ mt: 1, display: 'block' }}>
                                            ✓ {aadhaar.name}
                                        </Typography>
                                    )}
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Card variant="outlined" sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50' }}>
                                    <PhotoCamera sx={{ fontSize: 50, color: 'success.main', mb: 2 }} />
                                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                        Shop Photo
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        Upload business proof
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        fullWidth
                                    >
                                        Choose File
                                        <input 
                                            type="file" 
                                            hidden 
                                            accept="image/*"
                                            onChange={(e) => setShopPhoto(e.target.files[0])} 
                                            required 
                                        />
                                    </Button>
                                    {shopPhoto && (
                                        <Typography variant="caption" color="success.main" sx={{ mt: 1, display: 'block' }}>
                                            ✓ {shopPhoto.name}
                                        </Typography>
                                    )}
                                </Card>
                            </Grid>
                        </Grid>

                        <Button
                            fullWidth
                            variant="contained"
                            color="success"
                            type="submit"
                            size="large"
                            sx={{ mt: 4, py: 1.5, fontWeight: 700 }}
                        >
                            Register as Seller
                        </Button>
                    </Box>

                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Already have a seller account?{' '}
                            <Link to="/login/seller" style={{ fontWeight: 600, color: '#2e7d32' }}>
                                Login here
                            </Link>
                        </Typography>
                        <Typography variant="body2">
                            Want to buy products?{' '}
                            <Link to="/register/buyer" style={{ fontWeight: 600, color: '#1a237e' }}>
                                Register as Buyer
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </motion.div>
        </Container>
    );
};

export default SellerRegister;

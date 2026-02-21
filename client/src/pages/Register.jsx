import React, { useState } from 'react';
import {
    Container, TextField, Button, Typography,
    Paper, Box, Alert, MenuItem, Grid, Stepper, Step, StepLabel,
    InputAdornment, Card, CardContent, Stack
} from '@mui/material';
import {
    Person, Email, Phone, Lock, HomeRepairService,
    AssignmentInd, PhotoCamera
} from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { motion, AnimatePresence } from 'framer-motion';

const Register = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', password: '',
        role: 'buyer', district: '', productCategory: ''
    });
    const [aadhaar, setAadhaar] = useState(null);
    const [shopPhoto, setShopPhoto] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const steps = ['Core Information', 'Role & Specifics', 'Verification Documents'];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (aadhaar) data.append('aadhaar', aadhaar);
        if (shopPhoto) data.append('shopPhoto', shopPhoto);

        try {
            await API.post('/auth/register', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: { xs: 4, md: 8 } }}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography variant="h4" fontWeight={800} gutterBottom>Create Account</Typography>
                        <Typography variant="body2" color="text.secondary">Join the ODOP community today</Typography>
                    </Box>

                    <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
                        {steps.map((label) => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
                    </Stepper>

                    {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

                    <Box component="form" onSubmit={activeStep === 2 || (activeStep === 1 && formData.role === 'buyer') ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
                        <AnimatePresence mode="wait">
                            {activeStep === 0 && (
                                <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField fullWidth label="Full Name" name="name" value={formData.name} onChange={handleChange} required InputProps={{ startAdornment: <InputAdornment position="start"><Person color="action" /></InputAdornment> }} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField fullWidth label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required InputProps={{ startAdornment: <InputAdornment position="start"><Email color="action" /></InputAdornment> }} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField fullWidth label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required InputProps={{ startAdornment: <InputAdornment position="start"><Phone color="action" /></InputAdornment> }} />
                                        </Grid>
                                    </Grid>
                                </motion.div>
                            )}

                            {activeStep === 1 && (
                                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField fullWidth label="Create Password" name="password" type="password" value={formData.password} onChange={handleChange} required InputProps={{ startAdornment: <InputAdornment position="start"><Lock color="action" /></InputAdornment> }} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField fullWidth select label="Account Role" name="role" value={formData.role} onChange={handleChange}>
                                                <MenuItem value="buyer">Buyer - Enjoy Products</MenuItem>
                                                <MenuItem value="seller">Seller - Promote Crafts</MenuItem>
                                            </TextField>
                                        </Grid>
                                        {formData.role === 'seller' && (
                                            <>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField fullWidth label="District" name="district" value={formData.district} onChange={handleChange} required />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField fullWidth label="Product Category" name="productCategory" value={formData.productCategory} onChange={handleChange} required />
                                                </Grid>
                                            </>
                                        )}
                                    </Grid>
                                </motion.div>
                            )}

                            {activeStep === 2 && formData.role === 'seller' && (
                                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                    <Stack spacing={3}>
                                        <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                                            <AssignmentInd sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                                            <Typography variant="subtitle2" gutterBottom>Upload Aadhaar Card (PDF/Image)</Typography>
                                            <input type="file" onChange={(e) => setAadhaar(e.target.files[0])} required />
                                        </Card>
                                        <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                                            <PhotoCamera sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                                            <Typography variant="subtitle2" gutterBottom>Upload Shop Photo Proof</Typography>
                                            <input type="file" onChange={(e) => setShopPhoto(e.target.files[0])} required />
                                        </Card>
                                    </Stack>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                            <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                            <Button
                                variant="contained"
                                type="submit"
                                size="large"
                                sx={{ px: 4, fontWeight: 700 }}
                            >
                                {activeStep === 2 || (activeStep === 1 && formData.role === 'buyer') ? 'Finish Registration' : 'Continue'}
                            </Button>
                        </Box>
                    </Box>

                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Typography variant="body2">
                            Already have an account? <Link to="/login" style={{ fontWeight: 600, color: '#1a237e' }}>Login now</Link>
                        </Typography>
                    </Box>
                </Paper>
            </motion.div>
        </Container>
    );
};

export default Register;

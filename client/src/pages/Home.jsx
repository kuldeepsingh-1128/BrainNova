import React from 'react';
import { Container, Typography, Button, Box, Grid, Paper, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowForward, LocalMall, VerifiedUser, Public } from '@mui/icons-material';

const Home = () => {
    return (
        <Box>
            {/* Hero Section */}
            <Box sx={{
                bgcolor: 'primary.main',
                color: 'white',
                pt: { xs: 10, md: 15 },
                pb: { xs: 10, md: 15 },
                position: 'relative',
                overflow: 'hidden'
            }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={7}>
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <Typography variant="h1" sx={{
                                    fontSize: { xs: '2.5rem', md: '4rem' },
                                    lineHeight: 1.1,
                                    mb: 2
                                }}>
                                    One District <br />
                                    <span style={{ color: '#ffad42' }}>One Product</span>
                                </Typography>
                                <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, fontWeight: 400 }}>
                                    Empowering local artisans and showcasing the unique cultural heritage of every district to the global market.
                                </Typography>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                        component={Link}
                                        to="/products"
                                        endIcon={<ArrowForward />}
                                        sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
                                    >
                                        Explore Products
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="inherit"
                                        size="large"
                                        component={Link}
                                        to="/register"
                                        sx={{ px: 4, py: 1.5, fontSize: '1.1rem', borderColor: 'rgba(255,255,255,0.5)' }}
                                    >
                                        Become a Seller
                                    </Button>
                                </Stack>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Container>
                {/* Decorative elements could go here */}
            </Box>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ mt: -8, mb: 10, position: 'relative', zIndex: 1 }}>
                <Grid container spacing={3}>
                    {[
                        { title: 'Regional Excellence', desc: 'Sourced directly from the heart of each district.', icon: <Public color="primary" /> },
                        { title: 'Authentic Quality', desc: 'Verified artisans ensuring the highest standards.', icon: <VerifiedUser color="primary" /> },
                        { title: 'Direct Linkage', desc: 'Supporting local economies through direct trade.', icon: <LocalMall color="primary" /> }
                    ].map((feature, idx) => (
                        <Grid item xs={12} md={4} key={idx}>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <Paper sx={{ p: 4, textAlign: 'center', height: '100%', borderRadius: 4 }}>
                                    <Box sx={{
                                        width: 60, height: 60, borderRadius: '50%',
                                        bgcolor: 'rgba(26, 35, 126, 0.05)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        mx: 'auto', mb: 2
                                    }}>
                                        {feature.icon}
                                    </Box>
                                    <Typography variant="h6" gutterBottom>{feature.title}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {feature.desc}
                                    </Typography>
                                </Paper>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* CTA Section */}
            <Box sx={{ bgcolor: 'background.paper', py: 10 }}>
                <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" gutterBottom>Join the Movement</Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontWeight: 400 }}>
                        Whether you are a buyer looking for unique heritage products or a seller wanting to grow your business, ODOP is for you.
                    </Typography>
                    <Button variant="contained" color="primary" size="large" component={Link} to="/register">
                        Get Started Today
                    </Button>
                </Container>
            </Box>
        </Box>
    );
};

export default Home;

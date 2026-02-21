import React, { useState, useEffect } from 'react';
import { 
    Container, Typography, Paper, Box, TextField, Button, Avatar, 
    Chip, Divider, Grid
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const BuyerProfile = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        if (user) {
            setProfile({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || ''
            });
        }
    }, [user]);

    const handleUpdateProfile = () => {
        // TODO: Add API call to update profile
        console.log('Update profile:', profile);
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                My Profile
            </Typography>
            <Paper sx={{ p: 4 }}>
                <Box display="flex" flexDirection="column" alignItems="center" sx={{ mb: 4 }}>
                    <Avatar sx={{ width: 100, height: 100, bgcolor: '#1a237e', fontSize: 40, mb: 2 }}>
                        {user?.name?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <Typography variant="h5">{user?.name}</Typography>
                    <Chip label={user?.role} color="primary" size="small" sx={{ mt: 1 }} />
                </Box>
                <Divider sx={{ mb: 3 }} />
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            value={profile.email}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Phone"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Address"
                            multiline
                            rows={3}
                            value={profile.address}
                            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            variant="contained" 
                            fullWidth 
                            size="large"
                            onClick={handleUpdateProfile}
                        >
                            Update Profile
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default BuyerProfile;

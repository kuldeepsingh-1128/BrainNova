import React, { useState } from 'react';
import {
    AppBar, Toolbar, Typography, Button, Box, IconButton,
    Drawer, List, ListItem, ListItemText, ListItemButton,
    useMediaQuery, useTheme, Container, Menu, MenuItem
} from '@mui/material';
import { 
    Menu as MenuIcon, ShoppingCart, Receipt, Person, ShoppingBag,
    ArrowDropDown
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [loginAnchor, setLoginAnchor] = useState(null);
    const [registerAnchor, setRegisterAnchor] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleLogout = () => {
        logout();
        navigate('/login/buyer');
        setMobileOpen(false);
    };

    const handleLoginClick = (event) => {
        setLoginAnchor(event.currentTarget);
    };

    const handleRegisterClick = (event) => {
        setRegisterAnchor(event.currentTarget);
    };

    const handleLoginClose = () => {
        setLoginAnchor(null);
    };

    const handleRegisterClose = () => {
        setRegisterAnchor(null);
    };

    const drawer = (
        <Box sx={{ width: 250, pt: 2 }}>
            <Typography variant="h6" sx={{ px: 2, mb: 2, fontWeight: 700, color: 'primary.main' }}>
                ODOP
            </Typography>
            <List>
                {!user && (
                    <>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/products" onClick={() => setMobileOpen(false)}>
                                <ListItemText primary="Browse" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <Typography variant="subtitle2" color="text.secondary" sx={{ px: 2, py: 1 }}>
                                Buyer
                            </Typography>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/login/buyer" onClick={() => setMobileOpen(false)}>
                                <ListItemText primary="Buyer Login" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/register/buyer" onClick={() => setMobileOpen(false)}>
                                <ListItemText primary="Buyer Register" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <Typography variant="subtitle2" color="text.secondary" sx={{ px: 2, py: 1 }}>
                                Seller
                            </Typography>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/login/seller" onClick={() => setMobileOpen(false)}>
                                <ListItemText primary="Seller Login" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/register/seller" onClick={() => setMobileOpen(false)}>
                                <ListItemText primary="Seller Register" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <Typography variant="subtitle2" color="text.secondary" sx={{ px: 2, py: 1 }}>
                                Admin
                            </Typography>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/login/admin" onClick={() => setMobileOpen(false)}>
                                <ListItemText primary="Admin Login" />
                            </ListItemButton>
                        </ListItem>
                    </>
                )}
                {user && user.role === 'buyer' && (
                    <>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/products" onClick={() => setMobileOpen(false)}>
                                <ListItemText primary="Browse" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/cart" onClick={() => setMobileOpen(false)}>
                                <ListItemText primary="Cart" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/buyer/orders" onClick={() => setMobileOpen(false)}>
                                <ListItemText primary="Orders" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/buyer/profile" onClick={() => setMobileOpen(false)}>
                                <ListItemText primary="Profile" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleLogout}>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </ListItem>
                    </>
                )}
                {user && user.role === 'seller' && (
                    <>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/seller-dashboard" onClick={() => setMobileOpen(false)}>
                                <ListItemText primary="Dashboard" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleLogout}>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </ListItem>
                    </>
                )}
                {user && user.role === 'admin' && (
                    <>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/admin-dashboard" onClick={() => setMobileOpen(false)}>
                                <ListItemText primary="Admin" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleLogout}>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </ListItem>
                    </>
                )}
            </List>
        </Box>
    );

    return (
        <AppBar position="sticky" elevation={0} sx={{
            backgroundColor: 'background.paper',
            color: 'text.primary',
            borderBottom: '1px solid',
            borderColor: 'divider'
        }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Typography
                        variant="h5"
                        component={Link}
                        to="/"
                        sx={{
                            flexGrow: 1,
                            textDecoration: 'none',
                            color: 'primary.main',
                            fontWeight: 800,
                            display: 'flex',
                            alignItems: 'center',
                            letterSpacing: '-0.5px'
                        }}
                    >
                        ODOP<span style={{ color: theme.palette.secondary.main }}>.</span>
                    </Typography>

                    {isMobile ? (
                        <>
                            <IconButton color="inherit" onClick={() => setMobileOpen(true)}>
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                anchor="right"
                                open={mobileOpen}
                                onClose={() => setMobileOpen(false)}
                            >
                                {drawer}
                            </Drawer>
                        </>
                    ) : (
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            {!user && (
                                <>
                                    <Button
                                        component={Link}
                                        to="/products"
                                        color="inherit"
                                        sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}
                                    >
                                        Browse
                                        <ShoppingBag sx={{ fontSize: 20, ml: 0.5 }} />
                                    </Button>
                                    
                                    <Button
                                        onClick={handleLoginClick}
                                        color="inherit"
                                        endIcon={<ArrowDropDown />}
                                        sx={{ fontWeight: 600 }}
                                    >
                                        Login
                                    </Button>
                                    <Menu
                                        anchorEl={loginAnchor}
                                        open={Boolean(loginAnchor)}
                                        onClose={handleLoginClose}
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    >
                                        <MenuItem component={Link} to="/login/buyer" onClick={handleLoginClose}>
                                            Buyer Login
                                        </MenuItem>
                                        <MenuItem component={Link} to="/login/seller" onClick={handleLoginClose}>
                                            Seller Login
                                        </MenuItem>
                                        <MenuItem component={Link} to="/login/admin" onClick={handleLoginClose}>
                                            Admin Login
                                        </MenuItem>
                                    </Menu>
                                    
                                    <Button
                                        onClick={handleRegisterClick}
                                        color="primary"
                                        variant="contained"
                                        endIcon={<ArrowDropDown />}
                                        sx={{ fontWeight: 600 }}
                                    >
                                        Register
                                    </Button>
                                    <Menu
                                        anchorEl={registerAnchor}
                                        open={Boolean(registerAnchor)}
                                        onClose={handleRegisterClose}
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    >
                                        <MenuItem component={Link} to="/register/buyer" onClick={handleRegisterClose}>
                                            Buyer Register
                                        </MenuItem>
                                        <MenuItem component={Link} to="/register/seller" onClick={handleRegisterClose}>
                                            Seller Register
                                        </MenuItem>
                                    </Menu>
                                </>
                            )}
                            
                            {user && user.role === 'buyer' && (
                                <>
                                    <Button
                                        component={Link}
                                        to="/products"
                                        color="inherit"
                                        sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}
                                    >
                                        Browse
                                        <ShoppingBag sx={{ fontSize: 20, ml: 0.5 }} />
                                    </Button>
                                    <Button
                                        component={Link}
                                        to="/cart"
                                        color="inherit"
                                        sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}
                                    >
                                        Cart
                                        <ShoppingCart sx={{ fontSize: 20, ml: 0.5 }} />
                                    </Button>
                                    <Button
                                        component={Link}
                                        to="/buyer/orders"
                                        color="inherit"
                                        sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}
                                    >
                                        Orders
                                        <Receipt sx={{ fontSize: 20, ml: 0.5 }} />
                                    </Button>
                                    <Button
                                        component={Link}
                                        to="/buyer/profile"
                                        color="inherit"
                                        sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}
                                    >
                                        Profile
                                        <Person sx={{ fontSize: 20, ml: 0.5 }} />
                                    </Button>
                                    <Button
                                        onClick={handleLogout}
                                        color="inherit"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        Logout
                                    </Button>
                                </>
                            )}
                            
                            {user && user.role === 'seller' && (
                                <>
                                    <Button
                                        component={Link}
                                        to="/seller-dashboard"
                                        color="inherit"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        Dashboard
                                    </Button>
                                    <Button
                                        onClick={handleLogout}
                                        color="inherit"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        Logout
                                    </Button>
                                </>
                            )}
                            
                            {user && user.role === 'admin' && (
                                <>
                                    <Button
                                        component={Link}
                                        to="/admin-dashboard"
                                        color="inherit"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        Admin
                                    </Button>
                                    <Button
                                        onClick={handleLogout}
                                        color="inherit"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        Logout
                                    </Button>
                                </>
                            )}
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;

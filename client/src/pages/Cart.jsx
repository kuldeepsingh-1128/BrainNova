import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, IconButton } from '@mui/material';
import { Delete, Add, Remove } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(items);
    }, []);

    const updateQuantity = (id, delta) => {
        const updated = cartItems.map(item => {
            if (item.productId === id) {
                return { ...item, quantity: Math.max(1, item.quantity + delta) };
            }
            return item;
        });
        setCartItems(updated);
        localStorage.setItem('cart', JSON.stringify(updated));
    };

    const removeItem = (id) => {
        const filtered = cartItems.filter(item => item.productId !== id);
        setCartItems(filtered);
        localStorage.setItem('cart', JSON.stringify(filtered));
    };

    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    };

    const handleCheckout = async () => {
        if (!user) {
            alert('Please login to place an order');
            navigate('/login');
            return;
        }

        try {
            const orderData = {
                products: cartItems.map(item => ({ productId: item.productId, quantity: item.quantity })),
                totalAmount: calculateTotal()
            };
            await API.post('/buyer/orders', orderData);
            alert('Order placed successfully!');
            localStorage.removeItem('cart');
            setCartItems([]);
            navigate('/buyer-dashboard');
        } catch (err) {
            console.error(err);
            alert('Failed to place order');
        }
    };

    if (cartItems.length === 0) {
        return (
            <Container sx={{ textAlign: 'center', mt: 8 }}>
                <Typography variant="h5">Your cart is empty</Typography>
                <Button variant="contained" component={Link} to="/products" sx={{ mt: 2, bgcolor: '#1a237e' }}>
                    Start Shopping
                </Button>
            </Container>
        );
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Your Cart</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#1a237e' }}>
                            <TableCell sx={{ color: 'white' }}>Product</TableCell>
                            <TableCell sx={{ color: 'white' }}>Price</TableCell>
                            <TableCell sx={{ color: 'white' }}>Quantity</TableCell>
                            <TableCell sx={{ color: 'white' }}>Total</TableCell>
                            <TableCell sx={{ color: 'white' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartItems.map((item) => (
                            <TableRow key={item.productId}>
                                <TableCell>{item.product.name}</TableCell>
                                <TableCell>₹{item.product.price}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => updateQuantity(item.productId, -1)}><Remove /></IconButton>
                                    {item.quantity}
                                    <IconButton onClick={() => updateQuantity(item.productId, 1)}><Add /></IconButton>
                                </TableCell>
                                <TableCell>₹{item.product.price * item.quantity}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => removeItem(item.productId)} color="error"><Delete /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 4 }}>
                <Typography variant="h5" fontWeight="bold">Total: ₹{calculateTotal()}</Typography>
                <Button variant="contained" size="large" onClick={handleCheckout} sx={{ bgcolor: '#1a237e' }}>
                    Checkout
                </Button>
            </Box>
        </Container>
    );
};

// Inline helper because Link was not imported
import { Link } from 'react-router-dom';

export default Cart;

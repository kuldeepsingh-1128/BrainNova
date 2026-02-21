import React, { useState, useEffect } from 'react';
import { 
    Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Chip, Box
} from '@mui/material';
import { Receipt } from '@mui/icons-material';
import API from '../api/axios';

const BuyerOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await API.get('/buyer/orders');
            setOrders(data);
        } catch (err) {
            console.error(err);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'warning';
            case 'shipped': return 'info';
            case 'delivered': return 'success';
            default: return 'default';
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                My Orders
            </Typography>
            {orders.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Receipt sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                    <Typography color="text.secondary">No orders found</Typography>
                </Paper>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#1a237e' }}>
                                <TableCell sx={{ color: 'white' }}>Order ID</TableCell>
                                <TableCell sx={{ color: 'white' }}>Products</TableCell>
                                <TableCell sx={{ color: 'white' }}>Total Amount</TableCell>
                                <TableCell sx={{ color: 'white' }}>Status</TableCell>
                                <TableCell sx={{ color: 'white' }}>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order._id}>
                                    <TableCell>{order._id}</TableCell>
                                    <TableCell>
                                        {order.products?.map(p => (
                                            <Box key={p.productId?._id}>
                                                {p.productId?.name} x {p.quantity}
                                            </Box>
                                        ))}
                                    </TableCell>
                                    <TableCell>₹{order.totalAmount}</TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={order.status} 
                                            color={getStatusColor(order.status)} 
                                            variant="outlined" 
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default BuyerOrders;

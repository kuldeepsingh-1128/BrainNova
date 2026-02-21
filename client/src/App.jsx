import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BuyerLogin from './pages/BuyerLogin';
import SellerLogin from './pages/SellerLogin';
import AdminLogin from './pages/AdminLogin';
import BuyerRegister from './pages/BuyerRegister';
import SellerRegister from './pages/SellerRegister';
import SellerDashboard from './pages/SellerDashboard';
import BuyerOrders from './pages/BuyerOrders';
import BuyerProfile from './pages/BuyerProfile';
import AdminDashboard from './pages/AdminDashboard';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
    const { user, loading } = useAuth();
    if (loading) return <CircularProgress />;
    if (!user) return <Navigate to="/login" />;
    if (role && user.role !== role) return <Navigate to="/" />;
    return children;
};

function App() {
    return (
        <Box>
            <Navbar />
            <ChatBot />
            <Box sx={{ p: 3 }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    
                    {/* Legacy routes - redirect to buyer login/register */}
                    <Route path="/login" element={<Navigate to="/login/buyer" replace />} />
                    <Route path="/register" element={<Navigate to="/register/buyer" replace />} />
                    
                    {/* Separate login routes */}
                    <Route path="/login/buyer" element={<BuyerLogin />} />
                    <Route path="/login/seller" element={<SellerLogin />} />
                    <Route path="/login/admin" element={<AdminLogin />} />
                    
                    {/* Separate register routes */}
                    <Route path="/register/buyer" element={<BuyerRegister />} />
                    <Route path="/register/seller" element={<SellerRegister />} />
                    
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/product/:id" element={<ProductDetails />} />

                    <Route path="/buyer/orders" element={
                        <ProtectedRoute role="buyer">
                            <BuyerOrders />
                        </ProtectedRoute>
                    } />

                    <Route path="/buyer/profile" element={
                        <ProtectedRoute role="buyer">
                            <BuyerProfile />
                        </ProtectedRoute>
                    } />

                    <Route path="/buyer-dashboard" element={<Navigate to="/buyer/orders" replace />} />

                    <Route path="/seller-dashboard" element={
                        <ProtectedRoute role="seller">
                            <SellerDashboard />
                        </ProtectedRoute>
                    } />

                    <Route path="/admin-dashboard" element={
                        <ProtectedRoute role="admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    } />

                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </Box>
        </Box>
    );
}

export default App;

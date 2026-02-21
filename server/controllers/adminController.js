const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const jsonDb = require('../utils/jsonDb');

const useJson = process.env.USE_JSON_DB === 'true';

const verifySeller = async (req, res) => {
    try {
        const { id } = req.params;
        const { isVerified } = req.body;

        if (useJson) {
            const user = jsonDb.update('users', id, { isVerified });
            if (!user) return res.status(404).json({ message: 'User not found' });
            return res.json(user);
        }

        const user = await User.findByIdAndUpdate(id, { isVerified }, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        if (useJson) {
            const users = jsonDb.find('users').map(({ password, ...u }) => u);
            return res.json(users);
        }
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAnalytics = async (req, res) => {
    try {
        if (useJson) {
            const orders = jsonDb.find('orders');
            const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
            return res.json({
                totalUsers: jsonDb.count('users'),
                totalProducts: jsonDb.count('products'),
                totalOrders: orders.length,
                totalRevenue
            });
        }

        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();
        const revenueDetails = await Order.aggregate([
            { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } }
        ]);

        res.json({
            totalUsers,
            totalProducts,
            totalOrders,
            totalRevenue: revenueDetails[0]?.totalRevenue || 0
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { verifySeller, getAllUsers, getAnalytics };

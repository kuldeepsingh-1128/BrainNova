const Product = require('../models/Product');
const Order = require('../models/Order');
const jsonDb = require('../utils/jsonDb');

const useJson = process.env.USE_JSON_DB === 'true';

const getAllProducts = async (req, res) => {
    try {
        const { district, category, search } = req.query;
        if (useJson) {
            let products = jsonDb.find('products');
            if (district) products = products.filter(p => p.district === district);
            if (category) products = products.filter(p => p.category === category);
            if (search) products = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
            return res.json(products);
        }

        let query = {};
        if (district) query.district = district;
        if (category) query.category = category;
        if (search) query.name = { $regex: search, $options: 'i' };

        const products = await Product.find(query);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        if (useJson) {
            const product = jsonDb.findById('products', req.params.id);
            if (!product) return res.status(404).json({ message: 'Product not found' });
            return res.json(product);
        }
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const placeOrder = async (req, res) => {
    try {
        const { products, totalAmount } = req.body;
        if (useJson) {
            const order = jsonDb.insert('orders', {
                buyerId: req.user.id,
                products,
                totalAmount,
                status: 'pending',
                createdAt: new Date()
            });
            return res.status(201).json(order);
        }
        const order = new Order({
            buyerId: req.user.id,
            products,
            totalAmount
        });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getBuyerOrders = async (req, res) => {
    try {
        if (useJson) {
            const orders = jsonDb.find('orders', { buyerId: req.user.id });
            return res.json(orders);
        }
        const orders = await Order.find({ buyerId: req.user.id }).populate('products.productId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllProducts, getProductById, placeOrder, getBuyerOrders };

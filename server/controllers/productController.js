const Product = require('../models/Product');
const jsonDb = require('../utils/jsonDb');

const useJson = process.env.USE_JSON_DB === 'true';

const addProduct = async (req, res) => {
    try {
        const { name, description, price, stock, district, category } = req.body;
        const productData = {
            name, description, price: Number(price), stock: Number(stock),
            image: req.file ? req.file.path : null,
            district, category, sellerId: req.user.id
        };

        if (useJson) {
            const product = jsonDb.insert('products', productData);
            return res.status(201).json(product);
        }

        const product = new Product(productData);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSellerProducts = async (req, res) => {
    try {
        if (useJson) {
            const products = jsonDb.find('products', { sellerId: req.user.id });
            return res.json(products);
        }
        const products = await Product.find({ sellerId: req.user.id });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (req.file) updates.image = req.file.path;

        if (useJson) {
            const product = jsonDb.update('products', id, updates);
            if (!product) return res.status(404).json({ message: 'Product not found' });
            return res.json(product);
        }

        const product = await Product.findOneAndUpdate(
            { _id: id, sellerId: req.user.id },
            updates,
            { new: true }
        );
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (useJson) {
            jsonDb.delete('products', id);
            return res.json({ message: 'Product deleted' });
        }
        const product = await Product.findOneAndDelete({ _id: id, sellerId: req.user.id });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addProduct, getSellerProducts, updateProduct, deleteProduct };

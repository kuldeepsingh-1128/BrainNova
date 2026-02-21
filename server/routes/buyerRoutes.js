const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, placeOrder, getBuyerOrders } = require('../controllers/buyerController');
const { auth, authorize } = require('../middleware/auth');

router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);

router.post('/orders', auth, authorize('buyer'), placeOrder);
router.get('/orders', auth, authorize('buyer'), getBuyerOrders);

module.exports = router;

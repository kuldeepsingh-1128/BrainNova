const express = require('express');
const router = express.Router();
const { addProduct, getSellerProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const { auth, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Protector middleware to ensure seller is verified
const isVerifiedSeller = (req, res, next) => {
    if (req.user.role === 'seller' && !req.user.isVerified) {
        return res.status(403).json({ message: 'Access denied. Account not verified.' });
    }
    next();
};

router.use(auth, authorize('seller'), isVerifiedSeller);

router.post('/products', upload.single('image'), addProduct);
router.get('/products', getSellerProducts);
router.put('/products/:id', upload.single('image'), updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;

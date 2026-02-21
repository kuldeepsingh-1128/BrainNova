const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const upload = require('../middleware/upload');

router.post('/register', upload.fields([
    { name: 'aadhaar', maxCount: 1 },
    { name: 'shopPhoto', maxCount: 1 }
]), register);

router.post('/login', login);

module.exports = router;

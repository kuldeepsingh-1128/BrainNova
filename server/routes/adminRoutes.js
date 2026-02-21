const express = require('express');
const router = express.Router();
const { verifySeller, getAllUsers, getAnalytics } = require('../controllers/adminController');
const { auth, authorize } = require('../middleware/auth');

router.use(auth, authorize('admin'));

router.put('/verify-seller/:id', verifySeller);
router.get('/users', getAllUsers);
router.get('/analytics', getAnalytics);

module.exports = router;

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const jsonDb = require('../utils/jsonDb');
const bcrypt = require('bcryptjs');

const useJson = process.env.USE_JSON_DB === 'true';

const register = async (req, res) => {
    try {
        const { name, email, phone, password, role, district, productCategory } = req.body;

        if (useJson) {
            const existingUser = jsonDb.findOne('users', { email });
            if (existingUser) return res.status(400).json({ message: 'User already exists' });

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = jsonDb.insert('users', {
                name, email, phone, password: hashedPassword, role,
                district, productCategory,
                aadhaarFile: req.files?.aadhaar?.[0]?.path,
                shopPhoto: req.files?.shopPhoto?.[0]?.path,
                isVerified: role === 'buyer' ? true : false
            });
            return res.status(201).json({ message: 'User registered successfully' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const user = new User({
            name, email, phone, password, role, district, productCategory,
            aadhaarFile: req.files?.aadhaar?.[0]?.path,
            shopPhoto: req.files?.shopPhoto?.[0]?.path,
            isVerified: role === 'buyer' ? true : false
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user;

        if (useJson) {
            user = jsonDb.findOne('users', { email });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            user = await User.findOne({ email });
            if (!user || !(await user.comparePassword(password))) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
        }

        if (user.role === 'seller' && !user.isVerified) {
            return res.status(403).json({ message: 'Account not verified by admin yet' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { register, login };

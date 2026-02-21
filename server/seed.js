const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User'); // To link products to a dummy seller
require('dotenv').config();

const products = [
    {
        name: 'Luxurious Banarasi Silk Saree',
        description: 'Handwoven with exquisite gold zari work, this Banarasi silk saree represents the pinnacle of craftsmanship from Varanasi. Perfect for weddings and special occasions.',
        price: 45000,
        category: 'Textiles',
        district: 'Varanasi',
        stock: 5,
        image: 'uploads/banarasi_silk_saree.png'
    },
    {
        name: 'Jaipur Blue Pottery Vase',
        description: 'Traditional Blue Pottery from Jaipur, featuring intricate floral patterns in striking cobalt blue and turquoise. A unique piece of art for your home.',
        price: 2500,
        category: 'Pottery',
        district: 'Jaipur',
        stock: 12,
        image: 'uploads/blue_pottery_vase.png'
    },
    {
        name: 'Gorakhpur Terracotta Horse',
        description: 'Authentic Terracotta horse figurine from Gorakhpur, known for its earthy red texture and traditional tribal patterns. A symbol of regional heritage.',
        price: 1800,
        category: 'Handicrafts',
        district: 'Gorakhpur',
        stock: 20,
        image: 'uploads/terracotta_horse.png'
    },
    {
        name: 'Lucknow Chikan Embroidery Kurta',
        description: 'Fine Chikan embroidery on premium muslin fabric, handcrafted by artisans in Lucknow. Elegant, breathable, and timeless.',
        price: 3200,
        category: 'Textiles',
        district: 'Lucknow',
        stock: 15,
        image: 'uploads/chikan_kurta.png'
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // Delete existing products to avoid duplicates during dev
        await Product.deleteMany({});

        // Find or create a dummy seller to associate items
        let seller = await User.findOne({ role: 'seller' });
        if (!seller) {
            console.log('No seller found. Creating a default approved seller...');
            seller = await User.create({
                name: 'Heritage Artisan',
                email: 'seller@example.com',
                phone: '9876543210',
                password: 'password123',
                role: 'seller',
                district: 'Varanasi',
                productCategory: 'Handicrafts',
                isVerified: 'approved'
            });
            console.log('Default seller created: seller@example.com / password123');
        }

        const seededProducts = products.map(p => ({ ...p, seller: seller._id }));
        await Product.insertMany(seededProducts);

        console.log(`${seededProducts.length} products seeded successfully!`);
        process.exit();
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedDB();

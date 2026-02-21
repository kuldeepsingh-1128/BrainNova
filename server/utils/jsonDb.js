const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, '../data.json');

const readDb = () => {
    try {
        if (!fs.existsSync(DB_FILE)) {
            const initial = { users: [], products: [], orders: [] };
            fs.writeFileSync(DB_FILE, JSON.stringify(initial));
            return initial;
        }
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data || '{"users":[],"products":[],"orders":[]}');
    } catch (err) {
        return { users: [], products: [], orders: [] };
    }
};

const writeDb = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

const jsonDb = {
    find: (collection, query = {}) => {
        const db = readDb();
        return db[collection].filter(item => {
            return Object.keys(query).every(key => item[key] === query[key]);
        });
    },
    findOne: (collection, query = {}) => {
        const db = readDb();
        return db[collection].find(item => {
            return Object.keys(query).every(key => item[key] === query[key]);
        });
    },
    findById: (collection, id) => {
        const db = readDb();
        return db[collection].find(item => item._id === id);
    },
    insert: (collection, item) => {
        const db = readDb();
        const newItem = { ...item, _id: Date.now().toString() };
        db[collection].push(newItem);
        writeDb(db);
        return newItem;
    },
    update: (collection, id, updates) => {
        const db = readDb();
        const index = db[collection].findIndex(item => item._id === id);
        if (index !== -1) {
            db[collection][index] = { ...db[collection][index], ...updates };
            writeDb(db);
            return db[collection][index];
        }
        return null;
    },
    delete: (collection, id) => {
        const db = readDb();
        db[collection] = db[collection].filter(item => item._id !== id);
        writeDb(db);
    },
    count: (collection) => {
        return readDb()[collection].length;
    }
};

module.exports = jsonDb;

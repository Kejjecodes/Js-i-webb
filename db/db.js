const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'products.db'));

    db.exec(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            sku TEXT NOT NULL,
        )
    `);

module.exports = db;

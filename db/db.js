const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'products.db'));

    db.exec(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            sku TEXT NOT NULL,
            description TEXT NOT NULL DEFAULT ''
        )
    `);

const columns = db.prepare("PRAGMA table_info(products)").all();
const hasDescription = columns.some((column) => column.name === "description");

if (!hasDescription) {
    db.exec("ALTER TABLE products ADD COLUMN description TEXT NOT NULL DEFAULT ''");
}

module.exports = db;

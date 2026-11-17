const express = require("express");
const app = express();
const database = require("../db/db.js");


app.use(express.static("public"));


const port = 8000;

app.get("/api/products", (req, res) => {
    const products = database.prepare("SELECT id, name, price FROM products").all();
    res.json(products);
});

app.get("/", (req, res) => {
    res.send("Välkommen till produktdatabasen!");
});
app.post("/api/products", (req, res) => {
    const { name, price, sku } = req.body;
    const stmt = database.prepare("INSERT INTO products (name, price, sku) VALUES (?, ?, ?)");
    const info = stmt.run(name, price, sku);
    res.json({ id: info.lastInsertRowid });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
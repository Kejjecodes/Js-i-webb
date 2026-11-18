const express = require("express");
const app = express();
const database = require("../db/db.js");
app.use(express.json());


app.use(express.static("public"));


const port = 8000;

app.get("/api/products", (req, res) => {
    const products = database.prepare("SELECT id, name, price, sku, description FROM products").all();
    res.json(products);
});

app.get("/", (req, res) => {
    res.send("Välkommen till produktdatabasen!");
});
app.post("/api/products", (req, res) => {
    const { name, price, sku, description } = req.body;
    const stmt = database.prepare(
        "INSERT INTO products (name, price, sku, description) VALUES (?, ?, ?, ?)"
    );
    const info = stmt.run(name, price, sku, description);
    res.status(201).json({ id: info.lastInsertRowid });
});

app.delete("/api/products/:id", (req, res) => {
    const result = database
        .prepare("DELETE FROM products WHERE id = ?")
        .run(req.params.id);

    if (result.changes === 0) {
        return res.sendStatus(404);
    }

    res.sendStatus(204);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
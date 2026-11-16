const express = require("express");
const app = express();
const database = require("./db/db");


app.use(express.static("public"));


const port = 8000;

app.get("/api/products", (req, res) => {
    const products = database.prepare("SELECT id, name, price FROM products").all();
    res.json(products);
});

app.get("/", (req, res) => {
    res.send("Välkommen till produktdatabasen!");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
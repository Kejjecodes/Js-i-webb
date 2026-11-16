import express from "express";
import db from "./db/db.js";
const app = express();
const database = require("products.db");


app.use(express.static("public"));


const port = 8000;

app.get("/", (req, res) => {
    res.send("Välkommen till produktdatabasen!");
});

app.listen(port, () => {


    console.log(`Listening on port ${port}`)
import express from "express";
import db from "./db/db.js";
const app = express();
const database = require("products.db");


app.use(express.static("public"));


const port = 8000;


// Här börjar vi lyssna efter inkommande anrop över localhost:8000


app.listen(port, () => {


    console.log(`Listening on port ${port}`)
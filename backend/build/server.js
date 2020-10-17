import express from 'express';
import dotenv from 'dotenv';
import products from './data/products.js';
dotenv.config();
var app = express();
app.get('/', function (req, res) {
    res.send('API is running...');
});
app.get('/api/products', function (req, res) {
    res.json(products);
});
app.get('/api/products/:id', function (req, res) {
    var product = products.find(function (p) { return p._id === req.params.id; });
    res.json(product);
});
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () { return console.log("server running in " + process.env.NODE_ENV + " mode on port " + PORT); });

"use strict";
var express = require('express');
var productsImport = require('./data/products');
var app = express();
app.get('/', function (req, res) {
    // console.log(req, res)
    res.send('API is running');
});
app.get('/api/products', function (req, res) {
    res.json(productsImport);
});
app.get('/api/products/:id', function (req, res) {
    var product = productsImport.find(function (p) { return p._id === req.params.id; });
    res.json(product);
});
app.listen(5000, console.log('server running on port 5000'));

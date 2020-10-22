import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/config.js';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMidleware.js';
var col = colors;
dotenv.config();
connectDB();
var app = express();
app.get('/', function (req, res) {
    res.send('API is running...');
});
app.use('/api/products', productRoutes);
app.use(notFound);
app.use(errorHandler);
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () { return console.log(("server running in " + process.env.NODE_ENV + " mode on port " + PORT).yellow.bold); });
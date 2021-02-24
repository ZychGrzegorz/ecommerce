import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/config.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMidleware.js';
var col = colors;
dotenv.config();
connectDB();
var app = express();
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.get('/api/config/paypal', function (req, res) { return res.send(process.env.PAYPAL_CLIENT_ID); });
var __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    app.get('*', function (req, res) { return res.sendFile(path.resolve(__dirname, 'fronted', 'build', 'index.html')); });
}
else {
    app.get('/', function (req, res) {
        res.send('API is running...');
    });
}
app.use(notFound);
app.use(errorHandler);
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () { return console.log(("server running in " + process.env.NODE_ENV + " mode on port " + PORT).yellow.bold); });

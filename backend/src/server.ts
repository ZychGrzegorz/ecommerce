import express, { NextFunction } from 'express'
import dotenv from 'dotenv'
import {Request, Response} from 'express'
import colors from 'colors'
import connectDB from './config/config.js'
import productRoutes from './routes/productRoutes.js'
import {notFound, errorHandler} from './middleware/errorMidleware.js'

const col=colors

dotenv.config()
connectDB()

const app = express();

app.get('/',(req:Request,res:Response)=>{
    res.send('API is running...')
})

app.use('/api/products', productRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
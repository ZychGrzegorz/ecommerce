import path from 'path'
import express, { Application, NextFunction } from 'express'
import dotenv from 'dotenv'
import {Request, Response} from 'express'
import colors from 'colors'
import morgan from 'morgan'
import connectDB from './config/config.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import {notFound, errorHandler} from './middleware/errorMidleware.js'

const col=colors

dotenv.config()
connectDB()

const app: Application = express();

app.use(express.json())

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

app.get('/',(req:Request,res:Response)=>{
    res.send('API is running...')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal',(req: Request, res: Response)=> res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname,'/uploads')))

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
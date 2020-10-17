import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js';
import {Request, Response} from 'express'
dotenv.config()
const app = express();
app.get('/',(req:Request,res:Response)=>{
    res.send('API is running...')
})
app.get('/api/products',(req:Request,res:Response)=>{
    res.json(products)
})
app.get('/api/products/:id',(req:Request,res:Response)=>{
    const product = products.find((p:Product)=>p._id===req.params.id)
    res.json(product)
})
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
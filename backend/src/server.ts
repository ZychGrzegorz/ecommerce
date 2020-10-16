const express = require('express');
const productsImport = require ('./data/products');
const app = express();
app.get('/',(req:any,res:any)=>{
    // console.log(req, res)
    res.send('API is running')
})
app.get('/api/products',(req:any,res:any)=>{
    res.json(productsImport)
})
app.get('/api/products/:id',(req:any,res:any)=>{
    const product = productsImport.find((p:any)=>p._id===req.params.id)
    res.json(product)
})
app.listen(5000, console.log('server running on port 5000'));
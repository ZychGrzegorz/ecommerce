import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import {Request, Response} from 'express'


//@description   Fetch all products
//@route         Get /api/products
//@access        Public
const getProducts = asyncHandler(async (req:Request, res:Response)=>{
    const products = await Product.find({})

    res.json(products)
})

//@description   Fetch single product
//@route         Get /api/products/:id
//@access        Public
const getProductById = asyncHandler(async (req:Request, res:Response)=>{
    const product = await Product.findById(req.params.id)
    if(product) {
        res.json(product) 
    } else {
        res.status(404)
        throw new Error( 'Product not found')
    }
})

//@description   Delete a product
//@route         DELETE /api/products/:id
//@access        Private/Admin
const deleteProduct = asyncHandler(async (req:Request, res:Response)=>{
    // console.log(req.params)
    const product = await Product.findById(req.params.id)
    // console.log(product)
    if(product) {
        await product.remove()
        res.json({message: 'Product removed'})       
    } else {
        res.status(404)
        throw new Error( 'Product not found')
    }
})

export {
    getProducts, getProductById, deleteProduct
}
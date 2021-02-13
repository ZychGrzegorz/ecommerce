import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import {
    Request,
    Response
} from 'express'


//@description   Fetch all products
//@route         Get /api/products
//@access        Public
const getProducts = asyncHandler(async (req: Request, res: Response) => {
    const products = await Product.find({})

    res.json(products)
})

//@description   Fetch single product
//@route         Get /api/products/:id
//@access        Public
const getProductById = asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

//@description   Delete a product
//@route         DELETE /api/products/:id
//@access        Private/Admin
const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({
            message: 'Product removed'
        })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

//@description   Create a product
//@route         POST /api/products
//@access        Private/Admin
const createProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/assets/images/sample.jpg',
        imageMin: '/assets/imagesMin/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

//@description   Update a product
//@route         PUT /api/products/:id
//@access        Private/Admin
const updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const {
        name,
        price,
        description,
        image,
        imageMin,
        brand,
        category,
        countInStock
    } = req.body

    const product: any = await Product.findById(req.params.id)
    
    if (product) {
        product.name=name
        product.price=price
        product.description=description
        product.image=image
        product.imageMin=imageMin
        product.brand=brand
        product.category=category
        product.countInStock=countInStock
       

        const updatedProduct = await product.save()
        

        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct
}
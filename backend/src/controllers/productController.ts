import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import {
    Request,
    Response
} from 'express'


//@description   Fetch all products
//@route         Get /api/products  /keyword
//@access        Public
const getProducts = asyncHandler(async (req: Request, res: Response) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword?{
        name: {$regex: req.query.keyword,
        $options: 'i'}
    }:{

    }
    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize*(page-1))

    
    res.json({products, page, pages: Math.ceil(count / pageSize)})
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
        image: '/assets/images/Sample.png',
        imageMin: '/assets/imagesMin/Sample.png',
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

//@description   Create new review
//@route         POST /api/products/:id/reviews
//@access        Private
const createProductReview = asyncHandler(async (req: Request, res: Response) => {
    const {
        rating, comment
    } = req.body

    const product: any = await Product.findById(req.params.id)
    
    if (product) {
        const alreadyReviewed = product.reviews.find((r:any)=>r.user.toString()===req.user._id.toString())
        if(alreadyReviewed){
            res.status(400)
            throw new Error('Product already reviewed')
        }
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
    const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id
    }
    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating = product.reviews.reduce((acc:number,item:{rating: number})=>item.rating + acc,0)/Number(product.reviews.length)

    await product.save()
    res.status(201).json({message: 'Review added'})
})

//@description   Get top rated products
//@route         GET /api/products/top
//@access        Public
const getTopProducts = asyncHandler(async (req: Request, res: Response) => {
    const products = await Product.find({}).sort({rating: -1}).limit(3)

    res.json(products)
  
})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts
}
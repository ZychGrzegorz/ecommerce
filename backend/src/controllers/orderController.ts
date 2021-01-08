import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import {Request, Response} from 'express'


//@description   Create new order
//@route         Post /api/orders
//@access        Private
interface RequestExt extends Request{
    user: {
        _id: string
    }
}
const addOrderItems = asyncHandler(async (req:RequestExt, res:Response)=>{
const {orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body
if(orderItems&&orderItems.length===0){
    res.status(400)
    throw new Error('No order items')
} else{
    const order = new Order({
        orderItems ,user: req.user._id, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
}
})

export {addOrderItems} 

import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

interface RequestAuth extends Request{
    user: any
}

const protect = asyncHandler( async(req:RequestAuth,res:Response,next:NextFunction)=>{
   
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            
            try {
            token = req.headers.authorization.split(' ')[1]
            const decoded: any=jwt.verify(token, process.env.JWT_SECRET!)
            req.user=await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }    
})

const admin = (req: any, res: Response, next: NextFunction)=>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}

export {protect, admin}
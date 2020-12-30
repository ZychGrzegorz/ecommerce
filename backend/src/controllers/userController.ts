import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateTokens.js'
import {Request, Response} from 'express'


//@description   Auth user & get token
//@route         POST /api/users/login
//@access        Public - not need to send a token


const authUser = asyncHandler(async (req:Request, res:Response)=>{
    const {email,password}=req.body
    

        console.log(email, password)
    const user: any = await User.findOne({email})
    
  
    if (user && (await user.matchPassword(password))) {
       
        (res as any).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
    })
  

        } else {
            res.status(401)
            throw new Error('Invalid email or password')
        }
    }
)



//@description   Register a new user
//@route         POST /api/users
//@access        Public


const registerUser = asyncHandler(async (req:Request, res:Response)=>{
    const {name, email,password}=req.body
    
    const userExists: any = await User.findOne({email}) 
  
  if(userExists){
      res.status(400)
      throw new Error('User already exists')
  }
  
  const user:any = await User.create({
      name,
      email,
      password,
  })
  if(user){
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
    })
  }else {
    res.status(400)
    throw new Error('Invaild user data')
  }
})

//@description   Get user profile
//@route         GET /api/users/profiel
//@access        Private - need to send a token

interface RequestExt extends Request{
    user: {
        _id: string
    }
}

const getUserProfile = asyncHandler(async (req:RequestExt, res:Response)=>{
    const user: any = await User.findById(req.user._id)

    if(user){
        res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,})
    }else{
        res.status(404)
        throw new Error('User not found')
    }
    
    }
)



//@description   Get user profile
//@route         PUT /api/users/profile
//@access        Private

interface RequestExt extends Request{
    user: {
        _id: string
    }
}

const updateUserProfile = asyncHandler(async (req:RequestExt, res:Response)=>{
    const user: any = await User.findById(req.user._id)
        
    if(user){
       user.name=req.body.name || user.name
       user.email=req.body.email||user.email
       if(req.body.password){
           user.password=req.body.password
       }


       const updatedUser: any = await user.save()
       if(updatedUser){
        (res as any).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
       }
       

    }else{
        res.status(404)
        throw new Error('User not found')
    }
    
    }
)


export {authUser, getUserProfile, registerUser, updateUserProfile}
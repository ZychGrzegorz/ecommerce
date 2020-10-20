import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/config.js'

const col=colors
const mong=mongoose
dotenv.config()
connectDB()

const importData = async () =>{
    try {
        const delMany:any=null
        await User.deleteMany(delMany)
        await Product.deleteMany(delMany)
        await Order.deleteMany(delMany)

       const createdUsers =  await User.insertMany(users)
       const adminUser = createdUsers[0]._id
       const sampleProducts = products.map(products => {
           return {...products, user: adminUser}
       })
       await Product.insertMany(sampleProducts)
       console.log('Data Imported'.green.inverse)
       process.exit()

    } catch (error){
        console.error(`${error}`.red.inverse);
        process.exit(1)

    }
}

const destroyData = async () =>{
    try {
        const delMany:any=null
        await User.deleteMany(delMany)
        await Product.deleteMany(delMany)
        await Order.deleteMany(delMany)

      
       console.log('Data Destroyed'.red.inverse)
       process.exit()

    } catch (error){
        console.error(`${error}`.red.inverse);
        process.exit(1)

    }
}
if(process.argv[2]==='-d'){
destroyData()
}else{
    importData()
}
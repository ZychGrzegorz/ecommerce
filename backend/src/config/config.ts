import Mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
const col=colors
dotenv.config()

const connectDB = async ()=>{
    const uri = process.env.MONGO_URL
    try{
        if (typeof uri=='string'){
        const conn = await Mongoose.connect(uri,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true

        })
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)}
        else{ throw new Error('mongoDB url is not a string')}
    }catch(error){
        console.error(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB
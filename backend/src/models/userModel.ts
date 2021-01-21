import mongoose, {Document} from 'mongoose';
import bcrypt from 'bcryptjs'


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }

}, {
    timestamps: true
})

userSchema.methods.matchPassword = async function(enteredPassword: string){
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function(next){
    
    const userThis: any = this
    if(!userThis.isModified('password')){
        next()
    }
    const salt: any = await bcrypt.genSalt(10)
    userThis.password  = await bcrypt.hash(userThis.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
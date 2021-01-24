import jwt from 'jsonwebtoken'

interface idType{
    id: User['_id']
}


const generateToken=(id:idType)=>{
    return jwt.sign({id}, process.env.JWT_SECRET!, {
        expiresIn: '30d'
    })
}

export default generateToken
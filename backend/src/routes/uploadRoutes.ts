import path from 'path'
import express, { Response } from 'express'
import multer, { FileFilterCallback } from 'multer';
import {Request} from 'express'


const router=express.Router()

const storage = multer.diskStorage({
    destination(req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string)=>void){
    cb(null, 'uploads/')
    }
    ,
    filename(req: Request,file: Express.Multer.File ,cb: (error: Error | null, filename: string)=>void){
        cb(null , `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileType(file: Express.Multer.File,cb:(error: null | string, filename:  boolean | null)=>void){
    const filetypes:any = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if(extname && mimetype){
        return cb(null, true)
    }else{
        cb('Images only!', null)
    }
}

const upload = multer({
    storage,
    fileFilter: function(req: Request,file: Express.Multer.File, cb: any):void{
        checkFileType(file, cb)
    }
})

router.post('/', upload.single('image'), (req: Request,res: Response)=>{
    res.send(`/${req.file.path}`)
})

export default router
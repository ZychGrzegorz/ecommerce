import express from 'express'

import {Request, Response} from 'express'
import {  addOrderItems } from '../controllers/orderController.js'
import {protect} from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').post(protect, addOrderItems)

export default router


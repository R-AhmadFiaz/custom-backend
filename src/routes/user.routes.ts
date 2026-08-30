import { Router } from 'express';
import { registerUser } from '../controllers/user.controler.js';
import {asyncHandler} from 'utils/asyncHandler.ts'

const router = Router()


router.post('/register', asyncHandler(registerUser))

export {router}






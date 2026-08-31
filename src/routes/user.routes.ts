import { Router } from 'express';
import { registerUser } from '../controllers/user.controler.js';
import {asyncHandler} from '../utils/asyncHandler.js'
import {upload} from '../middleware/multer.middleware.js'

const router = Router()


router.post('/register', upload.fields([
    {name: 'avatar', maxCount: 1},
    {name: 'coverImage', maxCount: 1}
]),asyncHandler(registerUser))

export {router}






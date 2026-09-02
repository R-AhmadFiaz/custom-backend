import { Router } from 'express';
import { loggoutUser, loginUser, registerUser } from '../controllers/user.controler.js';
import {asyncHandler} from '../utils/asyncHandler.js'
import {upload} from '../middleware/multer.middleware.js'
import { verifyJwt } from '../middleware/auth.middleware.js';

const router = Router()


router.post('/register', upload.fields([
    {name: 'avatar', maxCount: 1},
    {name: 'coverImage', maxCount: 1}
]),asyncHandler(registerUser))

router.route('/login').post(asyncHandler(loginUser))
router.route('/logout').post(asyncHandler(verifyJwt) , asyncHandler(loggoutUser))

export {router}






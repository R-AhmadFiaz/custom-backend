import { Router } from 'express';
import { loggoutUser, loginUser, registerUser, refreshAccessToken,
        changeUserPassword, getCurrentUser, updateAccountDetails,
        updateCoverImage, updateAvatar}
 from '../controllers/user.controler.js';
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
router.route('/refresh-Access-Token').post(asyncHandler(refreshAccessToken))
router.route('/change-Password').post(verifyJwt, asyncHandler(changeUserPassword))
router.route('/get-Current-User').post(verifyJwt, asyncHandler(getCurrentUser))
router.route('/update-Account-Details').post(verifyJwt, asyncHandler(updateAccountDetails))
router.route('/update-Avatar').post(verifyJwt, asyncHandler(updateAvatar))
router.route('/update-Cover-Image').post(verifyJwt, asyncHandler(updateCoverImage))



export {router}






import {type Response, type Request } from "express"
import { apiError } from "../utils/apiError.js";
import { User } from "../model/user.model.js";
import { uploadOnCloudinary } from "../utils/fileUpload.js";
const registerUser = async (req: Request, res: Response ) => {

    // get information from frontend 
    // validate data = empty?
    // is user / email already exist
    // check image , cover image
    // upload image and coverimage on cloudinary
    // create user
    // remove password and refresh token as response
    // check for user response
    // return response


    const {username, email, fullname, password} = req.body;
    console.log(username, email);

    if([username, email, fullname, password].some((field) => {
        (field?.trim() == "")
    })){
        throw new apiError(400,'All fields are required')

    }

    const existedUser = User.findOne(
        {$or: [{username}, {password}]}
    )

    if(!existedUser){
        throw new apiError(409, 'Username and email already existed')
    }

    const files = req.files as { [key: string]: Express.Multer.File[] };

    const avatarFilePath = files.avatar?.[0]?.path;
    const coverImageFilePath = files.coverImage?.[0]?.path;

    if(!avatarFilePath){
        throw new apiError(400,'avatar is not recieved')
    }

    const avatar = await uploadOnCloudinary(avatarFilePath)
    const coverImage =  coverImageFilePath? await uploadOnCloudinary(coverImageFilePath) : null

    if (!avatar) {
        throw new apiError(400, 'avatar is required')
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatar.secure_url,
        coverImage: coverImage?.secure_url || "",
        fullname

    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {

        throw new apiError(500, 'something went wrong')
        
    }

    res.status(200).json(
        {messege: 'registered successfully'}
    )




}




export {registerUser}

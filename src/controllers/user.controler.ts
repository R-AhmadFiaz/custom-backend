import {type Response, type Request } from "express"
import { apiError } from "../utils/apiError.js";
import { User } from "../model/user.model.js";
import { uploadOnCloudinary } from "../utils/fileUpload.js";
import { apiResponse } from "../utils/apiResponse.js";

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

    const existedUser = await User.findOne(
        {$or: [{username}, {email}]}
    )

    if(!existedUser){
        throw new apiError(409, 'Username and email already existed')
    }

    console.log(req.files);

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
        {
            messege: 'registered successfully',
            createdUser
        }
    )




}


const generateAcessAndRefreshToken = async (user: any) => {

    try {

        // const userA = await User.findById(user); if i used  just id as param  to make new user object

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})


        return {accessToken, refreshToken}
        
    } catch (error) {
        throw new apiError(500, 'Something went wrong while generating Tokens')
    }

}


const loginUser = async (req: Request, res: Response ) => {
    // collect User data 
    // check every field
    // check username or email in database
    // check password match
    // assign access and refresh token
    // save refreshToken to database

    const {username, email, password} = req.body

    if (!username || !email) {
        throw new apiError(400, 'Required Every Field')
    }

    const user = await User.findOne({
        $or: [{username},{email}]
    })

    if (!user) {
        throw new apiError(400, 'User not Found')
    }

    const isPassValid = await user.isPasswordCorrect(password);

    if (!isPassValid) {
        throw new apiError(400, 'Correct Password Required')

    }

    

    const {accessToken, refreshToken} = await generateAcessAndRefreshToken(user)

    // const loggedInUser = await user.findById(user._id).some(
    //     "-password -refreshToken"
    // )  expsensive method calling mongoDb again

    // insteadd as i sedn whole user object now i can convert that into normal js object by 

    const LoggedInUser = user.toObject();

    delete LoggedInUser.password;
    delete LoggedInUser.refreshToken;

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new apiResponse(
            200,
            {
                accessToken,
                refreshToken,
                LoggedInUser
            },
            'successfully login'
        )
    )




}


const logout = async(req: Request, res: Response) => {

    
}


export {registerUser, loginUser, logout}

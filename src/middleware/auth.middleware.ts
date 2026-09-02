import { asyncHandler } from "../utils/asyncHandler.js";
import { type Request,type Response, type NextFunction } from "express";
import Jwt  from "jsonwebtoken";
import { apiError } from "../utils/apiError.js";
import { User } from "../model/user.model.js";



    const verifyJwt = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        throw new apiError(500, 'unauthorized access')
    }


    const decodedToken = Jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!
    ) as Jwt.JwtPayload & {_id : string}

    if (!decodedToken) {
        throw new apiError(500, 'Cant decode the token')
    }

    const user = await User.findById(decodedToken._id) 

    if (!user) {
        throw new apiError(401, 'No User Found')
    }

    req.user = user

    next()


    }

export {verifyJwt}

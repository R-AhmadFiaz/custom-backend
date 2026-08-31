// try catch method


// const asyncHandler = (reqHandler) => async(req, res, next) => {
//     try {
//         await reqHandler(req, res, next)
//     } catch (error) {

//         res.status(error.code || 500).json({
//             messege: 'something wrong'
//         })
        
//     }
// }

// promise method

import {type Response, type Request, type NextFunction } from "express"

const asyncHandler = (reqHandler:( req: Request, res: Response, next: NextFunction ) =>  Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(reqHandler(req, res, next)).catch((error) => {next(error)})
    }
}

export {asyncHandler}
import {type Response, type Request } from "express"
const registerUser = async (req: Request, res: Response ) => {

    res.status(200).json({
        messege: 'ok'
    })

}




export {registerUser}

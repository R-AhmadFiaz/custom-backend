import { User } from "../model/user.model.ts";

declare global{
    namespace Express{
        interface Request {
            user?: User
        }
    }
}

export {}
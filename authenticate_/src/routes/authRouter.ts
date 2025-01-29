import {Router} from 'express'
import {login} from "../controllers/authControllers"

const authRouter = Router()

authRouter.post('/login',login)

export default authRouter
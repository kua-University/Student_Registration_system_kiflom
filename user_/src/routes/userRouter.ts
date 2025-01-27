import {Router} from "express"
import {
    createUser,
    getUsers,
    getSingleUser,
    deleteSingleUser,
    updateUserByID,
    initPayment} from "../controllers/userControllers"
    
const userRouter = Router()

userRouter.get('/all',getUsers)
userRouter.post('/register',createUser)
userRouter.post('/initpayment', initPayment)
userRouter.get('/:userName',getSingleUser)
userRouter.delete('/:userName',deleteSingleUser)
userRouter.put('/:_id',updateUserByID)

export default userRouter
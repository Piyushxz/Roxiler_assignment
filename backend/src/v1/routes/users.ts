import { Router } from "express";
import { userMiddleware } from "../middlewares/middleware";
import { handleAddRating, handleGetStoreById, handleGetStoresWithRatings, handleGetUserProfile, handleUpdatePassword, handleUpdateRating, handleUserLogin, handleUserSignUp } from "../controllers/user-controller";


export const userRouter = Router()

userRouter.post('/sign-up',handleUserSignUp)
userRouter.post('/login',handleUserLogin)
userRouter.get('/profile',userMiddleware,handleGetUserProfile)
userRouter.put('/update-password',userMiddleware,handleUpdatePassword)
userRouter.get('/stores',userMiddleware,handleGetStoresWithRatings)
userRouter.get('/store/:id',userMiddleware,handleGetStoreById)
userRouter.post('/store/rating/:id',userMiddleware,handleAddRating)
userRouter.put('/store/rating/:ratingId',userMiddleware,handleUpdateRating)

import { Router } from "express";
import { handleAdminLogin, handleCreateUser, handleGetDashboardData, handleGetStores, handleGetUsers } from "../controllers/admin-controller";
import { adminMiddleware } from "../middlewares/middleware";


export const adminRouter = Router()
adminRouter.post('/login',handleAdminLogin)
adminRouter.post('/create-user',adminMiddleware,handleCreateUser)
adminRouter.get('/stores',adminMiddleware,handleGetStores)
adminRouter.get('/users',adminMiddleware,handleGetUsers)
adminRouter.get('/dashboard',adminMiddleware,handleGetDashboardData)

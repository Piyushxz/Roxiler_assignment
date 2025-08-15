import { Router } from "express";
import { handleAdminLogin, handleCreateStore, handleCreateUser, handleGetDashboardData, handleGetStores, handleGetUsers } from "../controllers/admin-controller";
import { adminMiddleware } from "../middlewares/middleware";


export const adminRouter = Router()
adminRouter.post('/login',handleAdminLogin)
adminRouter.post('/create-user',handleCreateUser)
adminRouter.get('/stores',adminMiddleware,handleGetStores)
adminRouter.post('/create-store',adminMiddleware,handleCreateStore)
adminRouter.get('/users',adminMiddleware,handleGetUsers)
adminRouter.get('/dashboard',adminMiddleware,handleGetDashboardData)

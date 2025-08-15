import { Router } from "express";
import { storeOwnerMiddleware } from "../middlewares/middleware";
import { 
    updatePassword, 
    getDashboard, 
    getStoreRatings,  
} from "../controllers/store-owner-controller";

export const storeOwnerRouter = Router();

// All routes require store owner authentication
storeOwnerRouter.use(storeOwnerMiddleware);

// Update password
storeOwnerRouter.put('/update-password', updatePassword);

// Get dashboard with store ratings and user information
storeOwnerRouter.get('/dashboard', getDashboard);

// Get specific store ratings
storeOwnerRouter.get('/store/:storeId/ratings', getStoreRatings);

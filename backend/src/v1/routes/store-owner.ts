import { Router } from "express";
import { storeOwnerMiddleware } from "../middlewares/middleware";
import { 
    updatePassword, 
    getDashboard, 
    getStoreRatings,  
} from "../controllers/store-owner-controller";

export const storeOwnerRouter = Router();

storeOwnerRouter.use(storeOwnerMiddleware);

storeOwnerRouter.put('/update-password', updatePassword);

storeOwnerRouter.get('/dashboard', getDashboard);

storeOwnerRouter.get('/store/ratings/:storeId', getStoreRatings);

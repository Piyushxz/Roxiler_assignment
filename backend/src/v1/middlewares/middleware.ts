import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'

interface CustomJwtPayload {
    userId: string;
    email: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: CustomJwtPayload;
        }
    }
}

export function adminMiddleware(req:Request,res:Response,next:NextFunction){
    try{
        const token = req.headers.authorization

        if(!token){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
                const decoded = jwt.verify(token, process.env.JWT_SECRET) as CustomJwtPayload
        
        if(decoded.role !== 'SYSTEM_ADMIN'){
            return res.status(401).json({
                message:"Unauthorized - Admin access required"
            })
        }
        
        req.user = decoded;
        
        next()

    }
    catch(err){
        console.error('Error verifying token:',err)
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}   

export function userMiddleware(req:Request,res:Response,next:NextFunction){
    try{
        const token = req.headers.authorization

        if(!token){
            return res.status(401).json({
                message:"Unauthorized - Token required"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as CustomJwtPayload

        if(decoded.role !== 'USER'){
            return res.status(401).json({
                message:"Unauthorized - User access required"
            })
        }
        
        req.user = decoded;
        
        next()

    }
    catch(err){
        console.error('Error verifying token:',err)
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

export function authMiddleware(req:Request,res:Response,next:NextFunction){
    try{
        const token = req.headers.authorization

        if(!token){
            return res.status(401).json({
                message:"Unauthorized - Token required"
            })
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET ) as CustomJwtPayload
        
        req.user = decoded;
        
        next()

    }
    catch(err){
        console.error('Error verifying token:',err)
        return res.status(401).json({
            message:"Invalid token"
        })
    }
}
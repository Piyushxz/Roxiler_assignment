import { Request, Response } from 'express';
import { userRegistrationSchema } from "../../schemas";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { client } from "../..";

export async function handleAdminLogin(req:Request,res:Response){

    try{

        const {email,password} = req.body
        if(!email || !password){

        const user = await client.user.findUnique({
            where:{email,role:'SYSTEM_ADMIN'}
        })

        if(!user){
             res.status(401).json({
                message:"Invalid credentials"
            })
            return;
        }

        const isPasswordValid = await bcrypt.compare(password,user.password)

        if(!isPasswordValid){
             res.status(401).json({
                message:"Invalid credentials"
            })
            return;
        }

        const token = jwt.sign({userId:user.id,email:user.email,role:user.role},process.env.JWT_SECRET,{expiresIn:'1h'})
        
        return res.status(200).json({
            message:"Admin login successful",
            token
        })
        
    }
}
    catch(err){
        console.error('Error admin login:',err)
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

export async function handleCreateUser(req:Request,res:Response){
    try{
        const {email,password,name,role,address} = req.body

        if(!email || !password || !name || !role)   {
                return  res.status(400).json({
                message:"All fields are required"
            })

        }

        const result = userRegistrationSchema.safeParse({
            email,
            password,
            name,
            role,
            address
        });
        
        if (!result.success) {
            res.status(400).json({
                message:"Not of valid types",
                errors: result.error
            })
            return;
        }

        const hashedPassword = await bcrypt.hash(password,10)
        
        const user = await client.user.create({
            data:{
                email,
                password:hashedPassword,
                name,
                role,
                address
            }
        })

        return res.status(201).json({
            message:"User created successfully",
            email:user.email,
            name:user.name,
            role:user.role
        })
        
    }catch(err){
        console.error('Error creating user:',err)
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

export async function handleGetStores(req:Request,res:Response){
    try{
        const stores = await client.store.findMany()
        return res.status(200).json({
            message:"Stores fetched successfully",
            stores
        })
    }catch(err){
        console.error('Error fetching stores:',err)
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

export async function handleGetDashboardData(req:Request,res:Response){
    try{
        const totalStores = await client.store.count()
        const totalUsers = await client.user.count()
        const totalRatings = await client.ratings.count()

        
        return res.status(200).json({
            message:"Dashboard data fetched successfully",
            totalRatings,
            totalStores,
            totalUsers
        })
    }catch(err){
        console.error('Error fetching dashboard data:',err)
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

export async function handleGetUsers(req:Request,res:Response) {
    try{
        const users = await client.user.findMany()
        return res.status(200).json({
            message:"Users fetched successfully",
            users
        })
    }catch(err){
        console.error('Error fetching users:',err)
    }
}
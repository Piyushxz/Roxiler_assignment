import { Request, Response } from 'express';
import { userRegistrationSchema } from "../../schemas";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { client } from "../..";

export async function handleAdminLogin(req:Request,res:Response){
    try{

        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({
                message:"All fields are required"
            })
        }
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

        const token = jwt.sign({userId:user.id,email:user.email,role:user.role},process.env.JWT_SECRET)
        
        return res.status(200).json({
            message:"Admin login successful",
            token
        })
        
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
        const { name, description, rating } = req.query;
        
        const whereClause: any = {};
        // IF WE dont check type string it may break if number is passed
        if (name && typeof name === 'string') {
            whereClause.name = {
                contains: name,
                mode: 'insensitive'
            };
        }
        
        if (description && typeof description === 'string') {
            whereClause.description = {
                contains: description,
                mode: 'insensitive'
            };
        }

        const stores = await client.store.findMany({
            where: whereClause,
            include:{
                ratings:true,
                owner: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        address: true
                    }
                }
            }
        })

        let storesWithAverageRating = stores.map(store => {
            const totalRatings = store.ratings.length;
            const averageRating = totalRatings > 0 
                ? store.ratings.reduce((sum, rating) => sum + rating.rating, 0) / totalRatings 
                : 0;

            return {
                id: store.id,
                name: store.name,
                description: store.description,
                createdAt: store.createdAt,
                updatedAt: store.updatedAt,
                ownerId: store.ownerId,
                owner: store.owner,
                totalRatings,
                averageRating: Math.round(averageRating * 100) / 100, 
                ratings: store.ratings
            };
        });

        if (rating && typeof rating === 'string' && rating !== 'All Ratings') {
            const ratingValue = parseInt(rating);
            storesWithAverageRating = storesWithAverageRating.filter(store => 
                store.averageRating >= ratingValue
            );
        }

        return res.status(200).json({
            message:"Stores fetched successfully",
            stores: storesWithAverageRating
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
        const { name, email, address, role } = req.query;
        
        const whereClause: any = {};
        
        if (name && typeof name === 'string') {
            whereClause.name = {
                contains: name,
                mode: 'insensitive'
            };
        }
        
        if (email && typeof email === 'string') {
            whereClause.email = {
                contains: email,
                mode: 'insensitive'
            };
        }
        
        if (address && typeof address === 'string') {
            whereClause.address = {
                contains: address,
                mode: 'insensitive'
            };
        }
        
        if (role && typeof role === 'string' && role !== 'All Roles') {
            whereClause.role = role;
        }

        const users = await client.user.findMany({
            where: whereClause
        });
        
        return res.status(200).json({
            message:"Users fetched successfully",
            users
        })
    }catch(err){
        console.error('Error fetching users:',err)
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

export async function handleCreateStore(req:Request,res:Response){
    try{
        const {name,description,userId} = req.body
        if(!name || !userId || !description){
            return res.status(400).json({
                message:"All fields are required"
            })
        }

        const findUser = await client.user.findUnique({
            where:{
                id:userId
            }
        })

        if(!findUser){
            return res.status(404).json({
                message:"User not found"
            })
        }

        if(findUser.role !== 'STORE_OWNER'){
            return res.status(403).json({
                message:"User is not a store owner"
            })
        }
        const store = await client.store.create({  
            data:{
                name,
                ownerId:userId,
                description,
                // ratings:{
                //     create:{
                //         rating:0,
                //         userId:userId
                //     }
                // }

            }
        })

        return res.status(201).json({
            message:"Store created successfully",
            store
        })
    }catch(err){
        console.error('Error creating store:',err)
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}
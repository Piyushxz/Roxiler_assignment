import { Request, Response } from 'express';
import { userRegistrationSchema } from "../../schemas";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { client } from '../..';


export async function handleUserSignUp(req:Request,res:Response){
    try{
        const {email,password,name,address} = req.body

        if(!email || !password || !name || !address )   {
                return  res.status(400).json({
                message:"All fields are required"
            })

        }

        const result = userRegistrationSchema.safeParse({
            email,
            password,
            name,
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
                role : 'NORMAL_USER',
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

export async function handleUserLogin(req:Request,res:Response){
    try{
        const {email,password} = req.body

        if(!email || !password){
            return res.status(400).json({
                message:"All fields are required"
            })
        }

        const user = await client.user.findUnique({
            where:{email,role:'NORMAL_USER'}
        })

        if(!user){
            return res.status(401).json({
                message:"User not found"
            })
        }
        
        const isPasswordValid = await bcrypt.compare(password,user.password)

        if(!isPasswordValid){
            return res.status(401).json({
                message:"Invalid credentials"
            })
        }

        const token = jwt.sign({userId:user.id,email:user.email,role:user.role},process.env.JWT_SECRET)
        
        return res.status(200).json({
            message:"User login successful",
            token
        })
    }
    catch(err){
        console.error('Error user login:',err)
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

export async function handleGetUserProfile(req:Request,res:Response){
    try{
        const user = req.user
        if(!user){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }

        let userProfile = await client.user.findUnique({
            where:{id:user.userId},
                select:{
                    id:true,
                    name:true,
                    email:true,
                    address:true,
                    role:true,
                    createdAt:true,
                    updatedAt:true,

                }
        })

        return res.status(200).json({
            message:"User profile fetched successfully",
            userProfile
        })
    }
    catch(err){
        console.error('Error getting user profile:',err)
    }
}


export async function handleUpdatePassword(req:Request,res:Response){
    try{
        const user = req.user
        if(!user){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }

        const {oldPassword,newPassword} = req.body

        if(!oldPassword || !newPassword){
            return res.status(400).json({
                message:"All fields are required"
            })
        }

        const findUser = await client.user.findUnique({
            where:{id:user.userId}
        })

        if(!findUser){
            return res.status(401).json({
                message:"User not found"
            })
        }

        const isPasswordValid = await bcrypt.compare(oldPassword,findUser.password)

        if(!isPasswordValid){
            return res.status(401).json({
                message:"Invalid credentials"
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword,10)

        await client.user.update({
            where:{id:user.userId},
            data:{password:hashedPassword}
        })

        return res.status(200).json({
            message:"Password updated successfully"
        })

    }
    catch(err){
        console.error('Error updating password:',err)
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

export async function handleGetStoresWithRatings(req:Request,res:Response){
    try{
        const {search} = req.query
        let whereClause = {}
        if(search){
            whereClause = {
                name:{
                    contains:search as string,
                    mode:'insensitive'
                }
            }
        }
           
        const stores = await client.store.findMany({
            select:{
                id:true,
                name:true,
                description:true,
                ownerId:true,
                owner:true,
                ratings:{
                    select:{
                        rating:true,
                        comment:true,
                        createdAt:true,
                        user:true,
                        userId:true,
                        id:true
                    }
                }
            },
            where:whereClause
        })

        // Calculate average rating for each store
        const storesWithAverageRating = stores.map(store => {
            const totalRatings = store.ratings.length;
            const averageRating = totalRatings > 0 
                ? store.ratings.reduce((sum, rating) => sum + rating.rating, 0) / totalRatings 
                : 0;

            return {
                ...store,
                totalRatings,
                averageRating: Math.round(averageRating * 100) / 100 // Round to 2 decimal places
            };
        });

        return res.status(200).json({
            message:"Stores fetched successfully",
            stores: storesWithAverageRating
        })
    }
    catch(err){
        console.error('Error fetching stores:',err)
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

export async function handleGetStoreById(req:Request,res:Response){
    try{
        const {id} = req.params
        if(!id){
            return res.status(400).json({
                message:"Store ID is required"
            })
        }

        const store = await client.store.findUnique({
            where:{id},
            select:{
                id:true,
                name:true,
                description:true,
                ownerId:true,
                owner:true,
                ratings:{
                    select:{
                        rating:true,
                        comment:true,
                        createdAt:true,
                        user:true,
                        userId:true
                    }
                }
            }
        })   

        if(!store){
            return res.status(404).json({
                message:"Store not found"
            })
        }

        return res.status(200).json({
            message:"Store fetched successfully",
            store
        })
    }
    catch(err){ 
        console.error('Error fetching store:',err)
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

export async function handleAddRating(req:Request,res:Response){
    try{
        const {id} = req.params
        const {rating,comment} = req.body

        if(!rating || !comment || !id){
            return res.status(400).json({
                message:"All fields are required"
            })
        }

        const store = await client.store.findUnique({
            where:{id}
        })

        if(!store){
            return res.status(404).json({
                message:"Store not found"
            })
        }

        const user = req.user
        if(!user){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
        
        const ratingData = await client.ratings.create({
            data:{
                rating,
                comment,
                userId:user.userId,
                storeId:id
            }
        })

        return res.status(201).json({
            message:"Rating added successfully",
            ratingData
        })
    }
    catch(err){
        console.error('Error adding rating:',err)
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

export async function handleUpdateRating(req:Request,res:Response){
    try{
        const {ratingId} = req.params
        const {rating,comment} = req.body

        if(!rating || !comment || !ratingId){
            return res.status(400).json({
                message:"All fields are required"
            })
        }
        const findRating = await client.ratings.findUnique({
            where:{id:ratingId},
            include:{
                user:{
                    select:{
                        id:true,
                        name:true,
                        email:true,
                        address:true,
                        role:true,
                    }
                }
            }
        })

        if(!findRating){
            return res.status(404).json({
                message:"Rating not found"
            })
        }

        if(findRating.user.id !== req.user?.userId){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }

        const ratingData = await client.ratings.update({
            where:{id:ratingId},
            data:{rating,comment}
        })
        
        return res.status(200).json({
            message:"Rating updated successfully",
            ratingData
        })
    }
    catch(err){
        console.error('Error updating rating:',err)
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

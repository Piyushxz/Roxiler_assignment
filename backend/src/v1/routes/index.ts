import { Router } from "express";
import { adminRouter } from "./admin";
import { ratingsRouter } from "./ratings";
import { userRouter } from "./users";
import { client } from "../..";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const v1Router = Router()

v1Router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(400).json({
                message: "Email and password are required"
            })
            return;
        }

        // Find user by email only (since email is unique)
        const user = await client.user.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            res.status(401).json({
                message: "Invalid credentials"
            })
            return;
        }

        // Compare password (assuming passwords are hashed)
        const isPasswordValid = await bcrypt.compare(password, user.password)
        
        if (!isPasswordValid) {
            res.status(401).json({
                message: "Invalid credentials"
            })
            return;
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: user.id, 
                email: user.email, 
                role: user.role 
            },
            process.env.JWT_SECRET ,
            { expiresIn: '24h' }
        )

        res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                createdAt: user.createdAt,
            }
        })
    }
    catch (err) {
        console.error('Login error:', err)
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

v1Router.use('/admin',adminRouter)
v1Router.use('/ratings',ratingsRouter)
v1Router.use('/users',userRouter)


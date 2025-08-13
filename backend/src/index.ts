import express from 'express'
import { v1Router } from './v1/routes'
import cors from "cors"
import dotenv from 'dotenv'
import {PrismaClient} from "./generated/prisma"
const app = express()

export const client = new PrismaClient()


app.use(express.json())
dotenv.config()
app.use(cors())

app.use('/api/v1',v1Router)

app.listen(8080, ()=>{
    console.log('server running')
})


import express from "express" 
import dotenv from "dotenv"
import cors from 'cors'
import mongoose from "mongoose"
import userRouter from "./routes/userRouter"
dotenv.config()

const app = express()
const port = process.env.PORT || 3000 
const mongoDbUrlUser = process.env.MONGODB_CONNECT_STRING_USER as string;  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users",userRouter)

export default app
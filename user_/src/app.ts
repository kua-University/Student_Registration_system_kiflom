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
app.use(cors())

mongoose.connect(mongoDbUrlUser).then(()=>{
  console.log("users database connected")
    app.listen(port,()=>{
      console.log("server running")
    })
  }).catch((error)=>{
  console.log("Error while connecting to users database")
  process.exit(1)
})

app.use("/users",userRouter)
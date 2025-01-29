import express from "express" 
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRouter from "./routes/authRouter"
dotenv.config()

const app = express()
const port = process.env.PORT || 5000 
const mongoDbUrl:string = process.env.MONGODB_CONNECT_STRING as string;   

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(mongoDbUrl).then(()=>{
  console.log("mongodb connected successfully")
  app.listen(port,()=>{
  console.log(`server running on port number ${port}`)
  }) 
} 
).catch((error)=>{
  console.log("Error while connecting to the database")
  process.exit(1)
})

app.use("/auth",authRouter)
import { Request,Response } from "express"
import userModel from "../models/user"

export const login = async (req:any,res:any) =>{
    try {
      const { userName, password, role } = req.body; 
      // console.log(userName, password, role)
        if(role !== "admin" && role !== "student") {
          return res.status(400).json({ successfulAuthentication:false, error: "Invalid role" });
        }
        if(!userName || !password) {
          return res.status(400).json({ successfulAuthentication:false , error: "Please fill in all fields" });
        }
        if (role === 'student'){
          const user = await userModel.findOne({ userName });
          if (!user) {
            return res.status(401).json({ successfulAuthentication:false , error: "user not found" });
          }
          const isMatch = password == user.password; 
          if (!isMatch) {
            return res.status(401).json({ successfulAuthentication:false , error: "Invalid credentials" });
          } 
          return res.status(200).json({ successfulAuthentication:true});  
        }else if(role === 'admin'){
          if (userName !== process.env.ADMIN_USERNAME) {
            return res.status(401).json({ successfulAuthentication:false , error: "Invalid username"
          });
          }

          const isMatch = password == process.env.ADMIN_PASSWORD; 
          if (!isMatch) {
            return res.status(401).json({ successfulAuthentication:false , error: "Invalid credentials"
          });
          } 
          return res.status(200).json({ successfulAuthentication:true});  
        }
    } catch (error) {
        return res.status(500).json({
            successfulAuthentication: false
        })
    }
}
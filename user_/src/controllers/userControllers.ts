import { Request,Response } from "express";
import userModel from "../model/user"
import { IUser } from "../interfaces/interfaces"; 
import axios from "axios"

//creates a brand new user
export const createUser = async (req: Request<IUser>, res: Response)=>{
    try{ 
      const {userName} = req.body
      const usrexist = await userModel.findOne({userName})
    if(usrexist){
        res.status(400).json({userAlreadyExists:true})
    }else{
        // const hashedPassword = await bcrypt.hash(password,10)
        // const newUser = new userModel({...req.body,password: hashedPassword})
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).json({successfulRegistration:true})
      }
    }catch(error){
            res.status(500).json({
                successfulRegistration: false
        })
    }
}


//getting the list of all the users
export const getUsers = async (req:Request,res:Response)=>{
    try {
        const users = await userModel.find();
        res.status(200).json({
            successfullFetching: true,
            data: users
        })
      } catch (error) {
        res.status(500).json({
            successfullFetching: false
        })
      }
}

//getting a single user 
export const getSingleUser = async (req:Request,res:Response)=>{
    try{
        const {userName} = req.params
        const user = await userModel.findOne({userName})
        if(user){
            res.status(200).json({
                userFound : true,
                data : user
            })
        }else{
            res.status(404).json({
                userFound : false,
            })
        }
    }catch (error){
        res.status(500).json({
            userFound : false
        })
    }
}


//removing a single user 
export const deleteSingleUser = async (req:Request,res:Response) =>{
    try{
        const {userName} = req.params
        const deletedUser = await userModel.findOneAndDelete({userName})
        if(!deletedUser){
            res.status(404).json({
                successfullDeletion : false
            })
        }else{
            res.status(200).json({
                successfullDeletion : true,
                data: deletedUser
            })
        }
    }catch(error){
        res.status(500).json({
            successfullDeletion: false
        })
    }
}

//update a single user's detail
export const updateUserByID = async (req:Request,res:Response)=>{
    try{
        const _id = req.params._id
        const {password} = req.body;
        const updatedUser = await userModel.findByIdAndUpdate(
            _id,
            req.body,
            { new: true, runValidators: true} 
          );
        if(!updatedUser){
            res.status(404).json({
                successfulUpdate : false
            })
        }else{
            res.status(200).json({
                successfullUpdate : true,     
                data : updatedUser
            })
        }
    }catch(error){
        res.status(500).json({
            successfullUpdate: false
        })
    }
}

export const initPayment = async (req:any,res:any)=>{
    const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY as string;
    const { amount, email, first_name, last_name, phone_number , tx_ref ,currency } = req.body;
    console.log(req.body)
    // if (!amount || !email || !first_name || !last_name || phone_number || !tx_ref) {
    //     return res.status(400).json({ message: 'Missing required fields' });
    // }
try {
    const data = {
        amount: Number.parseInt(amount),
        currency,
        email,
        first_name,
        last_name,
        phone_number,
        tx_ref,
        callback_url:`http://localhost:3000/payment-callback/${tx_ref}`,
        return_url: 'http://localhost:5173/student/payment-success'
    }

    const config = {
        headers: {
            Authorization: `Bearer ${CHAPA_SECRET_KEY}`, 
            'Content-Type': 'application/json'
        }
    } 
        const chapaUrl = 'https://api.chapa.co/v1/transaction/initialize';
        const response = await axios.post(chapaUrl,data,config);
        console.log("response: ",response.data)
        if (response.data.status === 'success') {
            return res.status(200).json({
                message: 'Payment initialized successfully',
                payment_url: response.data.data.checkout_url, 
            });
        } else {
            return res.status(500).json({ message: 'Failed to initialize payment' });
        }
} catch (error) {
        // console.error(error);
        console.log('Error communicating with Chapa API')
        return res.status(500).json({ message: 'Error communicating with Chapa API' });
} 
}
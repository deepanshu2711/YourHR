import { Request, Response } from "express";
import { User } from "../model/user";

export const signUpController = async(req:Request , res:Response) => {
        try {
            const { username, email, password } = req.body

        if(!username || !email || !password){
            return res.status(200).json({message: "All fields are required"})
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(200).json({message: "User already exists"})
        }

        const user = await User.create({username, email, password})
        return res.status(201).json({message: "User created successfully", user})
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Something went wrong"})
        }
}


export const signInController = async(req:Request , res:Response) => {
    try {
        const {email, password } = req.body

    if(!email || !password){
        return res.status(200).json({message: "All fields are required"})
    }

    const existingUser = await User.findOne({email})
    if(!existingUser){
        return res.status(200).json({message: "User does not exists"})
    }

    if(existingUser.password !== password){
        return res.status(200).json({message: "Invalid credentials"})
    }

    const user = await User.findOne({email})

    return res.status(201).json({message: "User signed in successfully", user})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Something went wrong"})
    }
}

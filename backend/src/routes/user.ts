import express from "express"
import { signInController, signUpController } from "../controllers/user"

export const userRouter = express.Router()

userRouter.post("/signup", signUpController)
userRouter.post("/signin", signInController)

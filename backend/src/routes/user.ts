import express from "express"
import { deleteFileController, signInController, signUpController, uploadFileController } from "../controllers/user"

export const userRouter = express.Router()

userRouter.post("/signup", signUpController)
userRouter.post("/signin", signInController)
userRouter.post("/upload", uploadFileController)
userRouter.delete("/delete/:email", deleteFileController)


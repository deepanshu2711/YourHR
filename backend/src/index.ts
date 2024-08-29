import express from "express"
import cors from "cors"
import { MongoDb } from "./mongodb"
import { userRouter } from "./routes/user"


const app = express()

MongoDb()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "*",
}))

app.use("/api", userRouter)


app.listen(8080, () => console.log("server started"))
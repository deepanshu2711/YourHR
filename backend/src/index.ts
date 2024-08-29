import express from "express"
import cors from "cors"
import { MongoDb } from "./mongodb"


const app = express()

MongoDb()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "http://localhost:5173",
}))


app.listen(8080, () => console.log("server started"))
import mongoose from "mongoose"

export const MongoDb =async() =>{
    mongoose.connect("mongodb+srv://deepanshuwebdev:W8PAeNAQCAsyGdw2@cluster0.sulei.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{
        console.log("MongoDb connected")
    })
    .catch((err)=>{
        console.log(err)
    })
}
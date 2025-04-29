import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URI;

mongoose.connect(MONGO_URL).then(()=>{
    console.log("MONGODB connected!!!");
}).catch((err)=>{
    console.log("MONGODB connection Error : ",err);
})

app.get("/",(req,res)=>{
    res.send("hello");
})
app.listen(PORT, ()=>{
    console.log(`app rendered on http://localhost:${PORT}`);
} )
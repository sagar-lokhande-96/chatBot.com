import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URI;

mongoose.connect(MONGO_URL).then(()=>{
    console.log("MONGODB connected!!!");
}).catch((err)=>{
    console.log("MONGODB connection Error : ",err);
})

// Routes
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/v1/user", userRoute);

app.listen(PORT, ()=>{
    console.log(`app rendered on http://localhost:${PORT}`);
} )
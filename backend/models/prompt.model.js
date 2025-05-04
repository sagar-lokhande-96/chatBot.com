import mongoose from "mongoose";

const promptSchema = new mongoose.Schema({
    role:{
        type:String,
        enum:["user","assistant"],
        required:true,
    },
    content:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
});

const Prompt = mongoose.model("Prompt", promptSchema);
export default Prompt;


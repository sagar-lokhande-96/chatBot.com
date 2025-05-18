import express from "express";
import { getPrompt } from "../controllers/prompt.control.js";
import userMiddleware from "../middlewares/prompt.middleware.js";
const router = express.Router();

router.post("/prompt", userMiddleware, getPrompt);


export default router;
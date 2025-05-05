import express from "express";
import { getPrompt } from "../controllers/prompt.control.js";

const router = express.Router();

router.post("/prompt", getPrompt);


export default router;
import express from "express";
import { getPrompt } from "../controllers/prompt.control.js";

const router = express.Router();

router.get("/prompt", getPrompt);


export default router;
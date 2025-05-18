import OpenAI from "openai";
import Prompt from "../models/prompt.model.js";

// Initialize DeepSeek
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
  baseURL: "https://api.deepseek.com/v1", 
});

// Controller function
export const getPrompt = async (req, res) => {
  const { content } = req.body;
  const userId = req.userId;
  if(!content || content.trim() === ""){
    return res.status(400).json({ errors: "Content is required!!!"});
  }
  
  try {
    // save user prompt in DB
    const userPrompt = await Prompt.create({
      userId,
      role: "user",
      content,
    });

    //send prompt to AI model
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat", // model name
      messages: [
        { role: "user", content: content },
      ],
    });

    const output = completion.choices[0].message.content;

    // save AI response in DB
    const aiResponse  = await Prompt.create({
      userId,
      role:"assistant",
      content: output,
    })

    return res.status(200).json({ reply : output });
  } catch (error) {
    console.error("OpenAi API Error:", error);
    return res
      .status(500)
      .json({ error: "Failed to get response from OpenAi " });
  }
};

import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_USER_SECRET = process.env.JWT_SECRET;
export { JWT_USER_SECRET };
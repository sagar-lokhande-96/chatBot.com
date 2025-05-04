import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_USER_PASSWORD = process.env.JWT_SECRET;
export default { JWT_USER_PASSWORD };
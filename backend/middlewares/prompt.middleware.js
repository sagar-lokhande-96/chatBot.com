import JWT from "jsonwebtoken";
import config from "../config.js";

function userMiddleware(req, res, next){
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({error: "No token Provide"});
    }


    const token = authHeader.split(" ")[1];
    try {
        const decoded = JWT.verify(token, config.JWT_USER_PASSWORD);
        console.log(decoded);
        req.userId = decoded._id;
        next();
    } catch (error) {
        return res.status(401).json({
            error: "Token is Invalid or Expired",
        })
        
    }
}

export default userMiddleware;
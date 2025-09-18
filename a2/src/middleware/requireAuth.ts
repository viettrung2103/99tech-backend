
import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/userModel";
import { AuthenticatedRequest } from "../types/types";
;


const requireAuth = async (req: AuthenticatedRequest , res:Response, next: NextFunction): Promise<void> => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: "Authorization token required" });
    return;
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET!) as JwtPayload;
    const _id = decoded._id;
    if (!_id) {
      res.status(401).json({ error: "Invalid token payload" })
      return;
    }
    

    req.user = await User.findOne({ _id }).select("_id");
    if (!req.user) {
      res.status(404).json({error:"User has not register"})
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export default requireAuth;

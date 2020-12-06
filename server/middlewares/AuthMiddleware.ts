import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "../config/config";
export class AuthMiddleware {
	public checkJwt(request: Request, response: Response, next: NextFunction) {
    const token: string = request.headers["authorization"] as string;
    let jwtPayload: any = {};

    try { 
      jwtPayload = jwt.verify(token, config.jwtSecret);
      response.locals.jwtPayload = jwtPayload;
    } catch {
      return response.status(401).json({message : "Unauthorized"});
    }
    
    const userId = jwtPayload;

    const newToken = jwt.sign({ userId },
      config.jwtSecret, { expiresIn: "1h" });

    response.setHeader(token, newToken);

    next();
	}
}
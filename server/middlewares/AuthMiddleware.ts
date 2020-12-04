import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "../config/config";
export class AuthMiddleware {
	public checkJwt(request: Request, response: Response, next: NextFunction) {
    const token: string = request.headers["authorization"] as string;
    let jwtPayload: any = {};

    //validate token
    try { 
      jwtPayload = jwt.verify(token, config.jwtSecret);
      response.locals.jwtPayload = jwtPayload;
    } catch {
      response.status(401).send();
      return;
    }
    
    //send new token on every request
    const { userId, email, login } = jwtPayload;

    const newToken = jwt.sign({ userId, email, login }, config.jwtSecret, {
      expiresIn: "1h"
    });

    response.setHeader(token, newToken);

    next();
	}
}
import {Request, Response, NextFunction} from "express"

import AppError from "../errors/appErrors";
import jwt from "jsonwebtoken"
import "dotenv/config"

export const authTokenMiddleware = (req:Request, res:Response, next:NextFunction)=>{
	let token = req.headers.authorization
	if(!token){
		throw new AppError("Missing Authorization Token", 401);
	};
	
	token=token.split(" ")[1];

	jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any)=>{
		if(error){
			throw new AppError("Invalid Token", 401);
		};
		req.user = {
			id: decoded.sub,
            is_advertiser: decoded.is_advertiser,
		}
		next();
	})
};
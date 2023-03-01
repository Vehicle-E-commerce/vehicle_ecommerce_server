import { AppDataSource } from "../../data-source";

import { ISessionRequest } from "../../interfaces/session";
import { User } from "../../entities/user.entity";

import AppError from "../../errors/appErrors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";



export const sessionService = async({ email, password }: ISessionRequest): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ email });

  if (!user) { throw new AppError( "User not found" ) };
  if (!bcrypt.compareSync(password, user.password)){
    throw new AppError("Wrong email/password", 403)};

  const token = jwt.sign({is_advertiser: user.is_advertiser}, process.env.SECRET_KEY as string, {
    subject: user.id,
    expiresIn: "24h"
  });

  return token;
};
import { AppDataSource } from "../../data-source";

import { User } from "../../entities/user.entity";

import AppError from "../../errors/appErrors";
import "dotenv/config";

import { v4 as uuid } from 'uuid';
import { sendPasswordResetEmail } from "../../utils/resetPassword.utils";


export const requestResetPasswordService = async(email: string): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ email });

  if (!user) { throw new AppError( "User not found" ) };

  const token = uuid();

  const resetPassword = {
    ...user,
    resetPasswordToken: token,
    resetPasswordExpires: new Date(Date.now() + 3600000)
  }

  user.resetPasswordToken = token;
  user.resetPasswordExpires = new Date(Date.now() + 3600000); 

  userRepository.save(user)

  console.log(userRepository)

  await sendPasswordResetEmail(email, token);

  return token;
};
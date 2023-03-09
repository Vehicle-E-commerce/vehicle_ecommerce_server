import { AppDataSource } from "../../data-source";

import { User } from "../../entities/user.entity";

import AppError from "../../errors/appErrors";
import "dotenv/config";

export const validateResetPasswordService = async (resetPasswordToken: string): Promise<boolean> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ resetPasswordToken });
   
  if (!user) { throw new AppError( "This email has not been registered" ) };
  const now =  new Date();
  if (now >= (user.resetPasswordExpires)) {
    throw new AppError("Reset time invalid");
  }

  return true
}
  
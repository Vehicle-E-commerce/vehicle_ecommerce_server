import { AppDataSource } from "../../data-source";
import AppError from "../../errors/appErrors";

import { validateResetPasswordService } from "./validateResetPassword.service";
import { User } from "../../entities/user.entity";
import { hashSync } from "bcrypt";

export const changePasswordService = async (resetPasswordToken: string, newPassword: string): Promise<boolean> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ resetPasswordToken });

  if (!user) { throw new AppError( "This email has not been registered" ) };

  await validateResetPasswordService(resetPasswordToken)

  await userRepository.update(user, {
    password: hashSync(newPassword, 10),
    resetPasswordExpires: new Date()
  }) 

  return true;
};
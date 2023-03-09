import { Request, Response } from "express";

import { validateResetPasswordService } from "../services/resetPassword/validateResetPassword.service";
import { requestResetPasswordService } from "../services/resetPassword/requestResetPassword.service";
import { changePasswordService } from "../services/resetPassword/changePassword.service";


export const requestResetPasswordController = async (req: Request, res: Response) => {
    const { email } = req.body;
    await requestResetPasswordService(email)
  
    res.status(200).json({ message: 'Password reset email sent' });
};

export const validateResetPasswordController = async (req: Request, res: Response) => {
    const { token } = req.params;
    
    await validateResetPasswordService(token)
    
    res.status(200).json({ message: 'Form from reset password sent' });
};
export const changePasswordController = async (req: Request, res: Response) => {
    const { token } = req.params;
    const {password} = req.body;

    await changePasswordService(token, password)
  
    res.status(200).json({ message: 'Change password sucess. Return from login !' });
};
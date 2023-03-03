import { Request, Response } from "express";
import { requestResetPasswordService } from "../services/resetPassword/requestResetPassword.service";
import { validateResetPasswordService } from "../services/resetPassword/validateResetPassword.service";


export const requestResetPasswordController = async (req: Request, res: Response) => {
    const { email } = req.body;
    await requestResetPasswordService(email)
  
    res.status(200).json({ message: 'Password reset email sent' });
};

export const validateResetPasswordController = async (req: Request, res: Response) => {
    const { token } = req.params;

    await validateResetPasswordService(token)
  
    res.status(200).json({ message: 'Password reset email sent' });
};
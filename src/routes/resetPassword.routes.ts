import { Router } from "express";
import { 
    requestResetPasswordController, 
    validateResetPasswordController,
 } from "../controllers/resetPassword.controller";

export const resetPasswordRoute = Router();

resetPasswordRoute.post('/', requestResetPasswordController)
resetPasswordRoute.get('/:token', validateResetPasswordController)

export default resetPasswordRoute;

import { Router } from "express";
import { 
    changePasswordController,
    requestResetPasswordController, 
    validateResetPasswordController,
 } from "../controllers/resetPassword.controller";

export const resetPasswordRoute = Router();

resetPasswordRoute.post('/', requestResetPasswordController)

resetPasswordRoute.get('/:token', validateResetPasswordController)

resetPasswordRoute.post('/:token', changePasswordController)

export default resetPasswordRoute;

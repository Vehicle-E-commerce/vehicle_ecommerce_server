import { Router } from "express";
import createUsersController from "../controllers/user.controller";

export const userRoutes = Router();

userRoutes.post("/", createUsersController)

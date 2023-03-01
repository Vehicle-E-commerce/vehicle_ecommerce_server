import { Router } from "express";
import { createUsersController, deleteUserController, listUsersController, updateUserController } from "../controllers/user.controller";


export const userRoutes = Router();

userRoutes.post("/", createUsersController)
userRoutes.get("/", listUsersController)
userRoutes.delete("/:id", deleteUserController)
userRoutes.patch("/:id", updateUserController)


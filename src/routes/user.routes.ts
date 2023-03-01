import { Router } from "express";
import { createUsersController, deleteUserController, listUsersController, updateUserController } from "../controllers/user.controller";
import authTokenMiddleware from "../middlewares/authToken.middleware";


export const userRoutes = Router();

userRoutes.post("/", createUsersController)
userRoutes.get("/", authTokenMiddleware, listUsersController)
userRoutes.delete("/:id", authTokenMiddleware, deleteUserController)
userRoutes.patch("/:id", authTokenMiddleware, updateUserController)


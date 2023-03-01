import { Router } from "express";
import { 
    createUsersController, 
    deleteUserController, 
    listUserController, 
    updateUserController 
} from "../controllers/user.controller";

import { authTokenMiddleware } from "../middlewares/authToken.middleware";


export const userRoutes = Router();

userRoutes.post("/", createUsersController)

userRoutes.get("/", authTokenMiddleware, listUserController)
userRoutes.delete("/", authTokenMiddleware, deleteUserController)
userRoutes.patch("/", authTokenMiddleware, updateUserController)


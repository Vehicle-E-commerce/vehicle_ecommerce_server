import { Router } from "express";
import {
  createImageController,
  deleteImageController,
} from "../controllers/images.controller";

import { authTokenMiddleware } from "../middlewares/authToken.middleware";

export const imageRoutes = Router();

imageRoutes.post("/:announcement_id", authTokenMiddleware, createImageController);
imageRoutes.delete("/:id", authTokenMiddleware, deleteImageController);

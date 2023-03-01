import { Router } from "express";
import {
  createImageController,
  deleteImageController,
} from "../controllers/images.controller";

export const imageRoutes = Router();

imageRoutes.post("/:announcement_id", createImageController);
imageRoutes.delete("/:id", deleteImageController);

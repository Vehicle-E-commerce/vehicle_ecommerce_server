import { Router } from "express";

import {
  createAnnouncementsController,
  deleteAnnouncementController,
  listAnnouncementsController,
  updateAnnouncementController,
} from "../controllers/announcement.controller";

import { authTokenMiddleware } from "../middlewares/authToken.middleware";

export const announcementRoutes = Router();

announcementRoutes.get("/", listAnnouncementsController);
announcementRoutes.get("/:id", listAnnouncementsController);
announcementRoutes.post("/", authTokenMiddleware, createAnnouncementsController);
announcementRoutes.patch("/:id", authTokenMiddleware, updateAnnouncementController);
announcementRoutes.delete("/:id", authTokenMiddleware, deleteAnnouncementController);

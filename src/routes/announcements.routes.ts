import { Router } from "express";
import {
  createAnnouncementsController,
  deleteAnnouncementController,
  listAnnouncementsController,
  updateAnnouncementController,
} from "../controllers/announcement.controller";

export const announcementRoutes = Router();

announcementRoutes.post("/", createAnnouncementsController);
announcementRoutes.get("/", listAnnouncementsController);
announcementRoutes.patch("/:id", updateAnnouncementController);
announcementRoutes.delete("/:id", deleteAnnouncementController);
